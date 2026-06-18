namespace sap.pfe.sd;

// VBAK – Sales Order Headers
entity VBAK {
  key _id        : String;
      VBELN      : String @cds.index;   // Sales order number - used in joins
      ERDAT      : String;   // Creation date (YYYY-MM-DD)
      AUDAT      : String @cds.index;   // Document date - used in filtering
      AUART      : String;   // Order type
      KUNNR      : String @cds.index;   // Sold-to customer - used in joins
      NETWR      : Double;   // Net order value
      WAERK      : String;   // Currency
      VKORG      : String;   // Sales organization
      VTWEG      : String;   // Distribution channel
      SPART      : String;   // Division
      VKBUR      : String;   // Sales office
      LIFSK      : String;   // Delivery block
      FAKSK      : String;   // Billing block
      GBSTK      : String;   // Overall processing status
      _sid       : String;
      _extracted_at : String;
}

// VBAP – Sales Order Items
entity VBAP {
  key _id        : String;
      VBELN      : String @cds.index;   // Sales order number - used in joins
      POSNR      : String;   // Item number
      MATNR      : String @cds.index;   // Material number - used in lookups
      ARKTX      : String;   // Short text
      KWMENG     : Double;   // Confirmed quantity
      VRKME      : String;   // Sales unit
      NETPR      : Double;   // Net price
      NETWR      : Double;   // Net value
      WAERK      : String;   // Currency
      WERKS      : String;   // Plant
      PSTYV      : String;   // Item category
      ABGRU      : String;   // Rejection reason
      GBSTA      : String;   // Overall status
      LFSTA      : String;   // Delivery status
      _sid       : String;
      _extracted_at : String;
}

// VBFA – Document Flow
entity VBFA {
  key _id        : String;
      VBELV      : String;   // Preceding document
      POSNV      : String;   // Preceding item
      VBELN      : String;   // Subsequent document
      POSNN      : String;   // Subsequent item
      VBTYP_N    : String;   // Document category (subsequent)
      VBTYP_V    : String;   // Document category (preceding)
      ERDAT      : String;   // Creation date
      _sid       : String;
      _extracted_at : String;
}

// LIKP – Delivery Headers
entity LIKP {
  key _id        : String;
      VBELN      : String @cds.index;   // Delivery number - used in joins
      ERDAT      : String;   // Creation date
      LFDAT      : String @cds.index;   // Planned delivery date - used in filtering
      WADAT_IST  : String @cds.index;   // Actual goods issue date - used in date calculations
      DELAY_DAYS : Integer;  // Computed: WADAT_IST - LFDAT
      KUNNR      : String;   // Ship-to customer
      LFART      : String;   // Delivery type
      VSTEL      : String;   // Shipping point
      TRAID      : String;   // Transport ID
      LFSTA      : String;   // Delivery status
      WBSTK      : String;   // Goods movement status
      _sid       : String;
      _extracted_at : String;
}

// LIPS – Delivery Items
entity LIPS {
  key _id        : String;
      VBELN      : String @cds.index;   // Delivery number - used in joins
      POSNR      : String;   // Delivery item
      VGBEL      : String @cds.index;   // Reference order - used in joins
      VGPOS      : String;   // Reference item
      MATNR      : String @cds.index;   // Material number - used in lookups
      LFIMG      : Double;   // Actual delivery quantity
      VRKME      : String;   // Sales unit
      LGORT      : String;   // Storage location
      WERKS      : String;   // Plant
      CHARG      : String;   // Batch number
      _sid       : String;
      _extracted_at : String;
}

// VBRK – Invoice Headers
entity VBRK {
  key _id           : String;
      VBELN         : String @cds.index;   // Billing document number - used in lookups
      FKDAT         : String @cds.index;   // Billing date (YYYY-MM-DD) - used for grouping/filtering
      FKART         : String;   // Billing type
      KUNRG         : String;   // Payer customer
      NETWR         : Double;   // Net invoice value
      MWSBP         : Double;   // Tax amount
      TOTAL_INCL_TAX: Double;   // Net + Tax
      WAERK         : String;   // Currency
      VKORG         : String;   // Sales organization
      RFBSK         : String;   // Transfer status to FI
      FKSTO         : String;   // Cancellation flag
      _sid          : String;
      _extracted_at : String;
}

// VBRP – Invoice Items
entity VBRP {
  key _id        : String;
      VBELN      : String @cds.index;   // Billing document - used in joins
      POSNR      : String;   // Billing item
      VGBEL      : String @cds.index;   // Reference document - used in joins
      VGPOS      : String;   // Reference item
      MATNR      : String;   // Material number
      FKIMG      : Double;   // Billed quantity
      VRKME      : String;   // Sales unit
      NETWR      : Double;   // Net value
      MWSBP      : Double;   // Tax amount
      WAERK      : String;   // Currency
      _sid       : String;
      _extracted_at : String;
}

// KNA1 – Customer Master
entity KNA1 {
  key _id        : String;
      KUNNR      : String @cds.index;   // Customer number - used in joins
      NAME1      : String;   // Customer name
      LAND1      : String;   // Country
      ORT01      : String;   // City
      PSTLZ      : String;   // Postal code
      BRSCH      : String;   // Industry sector
      KUKLA      : String;   // Customer classification
      KTOKD      : String;   // Account group
      _sid       : String;
      _extracted_at : String;
}

// MAKT – Material Descriptions
entity MAKT {
  key _id        : String;
      MATNR      : String @cds.index;   // Material number - used in lookups
      SPRAS      : String;   // Language
      MAKTX      : String;   // Material description
      _sid       : String;
      _extracted_at : String;
}

// MARA – Material Master
entity MARA {
  key _id        : String;
      MATNR      : String @cds.index;   // Material number - used in lookups
      MTART      : String;   // Material type
      MATKL      : String;   // Material group
      MEINS      : String;   // Base unit of measure
      BISMT      : String;   // Old material number
      MBRSH      : String;   // Industry sector
      _sid       : String;
      _extracted_at : String;
}