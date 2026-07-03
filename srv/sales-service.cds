using {sap.pfe.sd as my} from '../db/schema.cds';

service SalesService {
    entity Clients             as projection on my.KNA1;
    entity Commandes           as projection on my.VBAK;
    entity Postes              as projection on my.VBAP;
    entity Deliveries          as projection on my.LIKP;
    entity Invoices            as projection on my.VBRK;

    entity LivItems            as projection on my.LIPS;
    entity FactItems           as projection on my.VBRP;
    entity DocFlow             as projection on my.VBFA;
    entity Materials           as projection on my.MARA;
    entity MaterialTexts       as projection on my.MAKT;


    //----------KPI1-----------------------
    // Group by currency to avoid mixing EUR + TND + USD
    @readonly
    entity RevenueByPeriod     as
        select from my.VBRK {
            key _id,
                FKDAT as billingDate,
                substring(
                    FKDAT, 1, 4
                )     as year    : String, // 'YYYY'        pos 1-4
                substring(
                    FKDAT, 1, 4
                ) || '-' || substring(
                    FKDAT, 6, 2
                )     as month   : String, // 'YYYY-MM'     rebuilt
                case
                    when substring(
                             FKDAT, 6, 2
                         ) in (
                             '01', '02', '03'
                         )
                         then 'Q1'
                    when substring(
                             FKDAT, 6, 2
                         ) in (
                             '04', '05', '06'
                         )
                         then 'Q2'
                    when substring(
                             FKDAT, 6, 2
                         ) in (
                             '07', '08', '09'
                         )
                         then 'Q3'
                    else 'Q4'
                end   as quarter : String,
                WAERK as currency,         // Add to key
                sum(NETWR) as totalNetValue
        }
        where
               FKSTO <> 'X'
            or FKSTO is null
        group by FKDAT, WAERK;

    //---------KPI2--------------------------
    // LEFT JOIN: include orders without customer master (optional KNA1 link)
    @readonly
    entity SalesByCustomer     as
        select from my.VBAK as o
        left join my.KNA1 as c
            on c.KUNNR = o.KUNNR
        {
            key o._id,
                o.KUNNR as customerId   : String,
                c.NAME1 as customerName : String,
                o.AUDAT as orderDate, // for optional period filtering
                o.NETWR as netValue,
                o.WAERK as currency
        };

    //--------KPI3-----------------------
    function getDeliveryRate()   returns Decimal;

    //---------KPI4 : Backlog Commandes-----------------------
    // Commandes en attente de livraison ou facturation (Statut global différent de 'C' - Complet)
    @readonly
    entity OrderBacklog        as
        select from my.VBAK {
            key _id,
                VBELN as orderId,
                AUDAT as orderDate,
                KUNNR as customerId,
                NETWR as netValue,
                WAERK as currency,
                GBSTK as status
        }
        where
               GBSTK != 'C'
            or GBSTK is null;

    //---------KPI5 : Délai moyen de traitement---------------
    @readonly
    entity ProcessingTimeMetrics {
        key _id               : String;
            orderDate         : String;
            actualDeliveryDate : String;
            processingDays     : Integer;
    }

    // Fonction pour calculer la moyenne en jours
    function getAverageProcessingTime() returns Decimal;


    //---------KPI6 : Répartition géographique----------------
    // Ventes (NETWR) croisées avec le pays du client (LAND1)
    // INNER JOIN: only include sales with customer master (no orphaned orders)
    @readonly
    entity SalesByCountry      as
        select from my.VBAK as o
        inner join my.KNA1 as c
            on c.KUNNR = o.KUNNR
        {
            key o._id,
                c.LAND1 as country,
                c.ORT01 as city,
                o.NETWR as netValue,
                o.WAERK as currency
        };
}