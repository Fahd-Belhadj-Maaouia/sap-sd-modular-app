using { sap.pfe.sd as my } from '../db/schema.cds';
service SalesService {
    entity Clients as projection on my.KNA1;
    entity Commandes as projection on my.VBAK;
    entity Postes as projection on my.VBAP;
    entity Livraisons as projection on my.LIKP;
    entity Factures as projection on my.VBRK;
}