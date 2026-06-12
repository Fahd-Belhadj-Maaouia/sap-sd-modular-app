using { sap.pfe.sd as my } from '../db/schema.cds';

service SalesService {
    entity Clients     as projection on my.KNA1;
    entity Commandes   as projection on my.VBAK;
    entity Postes      as projection on my.VBAP;
    entity Deliveries  as projection on my.LIKP;
    entity Invoives    as projection on my.VBRK;

    entity LivItems    as projection on my.LIPS;
    entity FactItems   as projection on my.VBRP;
    entity DocFlow     as projection on my.VBFA;
    entity Materials   as projection on my.MARA;
    entity MaterialTexts as projection on my.MAKT;


    function getDeliveryRate() returns Decimal;
}