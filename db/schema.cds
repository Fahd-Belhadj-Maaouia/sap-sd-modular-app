namespace sap.pfe.sd;

entity KNA1 {
  key KUNNR : String;
  NAME1     : String;
  LAND1     : String;
  ORT01     : String;
  BRSCH     : String;
}

entity VBAK {
  key VBELN : String;
  KUNNR     : Association to KNA1;
  ERDAT     : Date;
  NETWR     : Decimal(15, 2);
  WAERK     : String;
}

entity VBAP {
  key VBELN : String;
  key POSNR : String;
  MATNR     : String;
  KWMENG    : Integer;
  NETWR     : Decimal(15, 2);
}

entity LIKP {
  key VBELN_VL : String;
  ERDAT        : Date;
  VBELN_VA     : Association to VBAK;
  LFDAT        : Date;
  STATUT       : String;
}

entity VBRK {
  key VBELN_VF : String;
  FKDAT        : Date;
  KUNAG        : Association to KNA1;
  NETWR        : Decimal(15, 2);
  WAERK        : String;
}