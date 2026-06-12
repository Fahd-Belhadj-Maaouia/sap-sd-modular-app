# sap-sd-modular-app
A cloud-native modular application built on SAP BTP using CAP (Node.js) and REACTUI5 to analyze SAP SD data, featuring optional containerization on Kyma Runtime.

# Modular Application for SAP SD Data Analysis on SAP BTP

[![SAP BTP](https://img.shields.io/badge/SAP-BTP-blue?logo=sap)](https://www.sap.com/products/technology-platform.html)
[![CAP](https://img.shields.io/badge/SAP%20CAP-Node.js-green)](https://cap.cloud.sap/docs/)
[![SAPUI5](https://img.shields.io/badge/UI5-Fiori%20Elements-orange)](https://sapui5.hana.ondemand.com/)

An end-to-end, cloud-native modular application designed to extract, transform, and visualize commercial and logistical data from the **SAP Sales & Distribution (SD)** module. Built on **SAP Business Technology Platform (BTP)**, this project bridges traditional on-premise ERP data barriers using modern cloud architectures.

---

## 🚀 Project Overview

In traditional setups, SAP ECC or SAP S/4HANA on-premise environments generate vast amounts of valuable data that often remain siloed within private networks. This project demonstrates how to securely surface and model that data in the cloud using **SAP HANA Cloud**, process it via a **SAP Cloud Application Programming Model (CAP)** backend, and deliver interactive, analytical insights through an enterprise-ready **SAPUI5/React (Fiori Design)** dashboard.

### Key Objectives
* **Data Modeling:** Design an analytical data model in SAP HANA Cloud mirroring core SAP SD tables (VBAK, VBAP, LIKP, LIPS, VBRK, VBRP, KNA1).
* **Mock Data Generation:** Programmatically generate realistic demo datasets (~500 orders, 1000 items, 50 clients) to simulate live workloads.
* **OData Services:** Build a robust Node.js backend using CAP to expose managed OData services.
* **Analytics & KPIs:** Implement real-time dashboards to track revenue, customer rankings, and logistical efficiency.
* **Cloud & Hybrid Deployment:** Deploy to SAP BTP (Cloud Foundry) with a roadmap for containerization via Kyma Runtime (Kubernetes).

---

## 🛠️ Technical Stack

* **Frontend:** SAPUI5 / React (SAP Fiori Design Guidelines)
* **Backend:** SAP Cloud Application Programming Model (CAP) — Node.js
* **Database:** SAP HANA Cloud (CDS Modeler & Core Data Services)
* **Connectivity:** SAP Cloud Connector (Secure Tunneling for On-Premise integration)
* **Hosting & Environment:** SAP BTP Free Trial (Cloud Foundry Runtime)
* **Containerization:** SAP BTP Kyma Runtime (Kubernetes)

---

## 📊 Tracked Analytics & KPIs

The frontend dashboard serves critical real-time enterprise metrics:
1. **Global Turnover (CA Global):** Total sales distribution aggregated by month and quarter.
2. **Top Customers:** Ranking of clients based on order volumes and revenue generation.
3. **Delivery Performance:** Percentage of sales orders fulfilled and delivered on time.
4. **Order Backlog:** Monitored pipeline of orders pending delivery or invoicing status.
5. **Lead Time:** Average processing duration between initial sales order creation and official delivery.
6. **Geographical Distribution:** Sales performance broken down by country and economic region.

---

## 🗺️ Implementation Roadmap

* **Phase 1: Foundation & Modeling** — Functional analysis, HANA Cloud CDS schema definitions, and fake dataset loading.
* **Phase 2: Backend Development** — Building CAP business logic and exposing OData endpoints.
* **Phase 3: Frontend Mastery** — Crafting freestyle/Fiori Element analytical UI views and charting bindings.
* **Phase 4: Cloud Foundry Deployment** — Structuring mta.yaml, setting up BTP destinations, and launching to SAP BTP.
* **Phase 5: Kyma Containerization (Extension)** — Writing Dockerfiles, configuring Kubernetes pods, and evaluating Cloud Foundry vs Kyma architectures.

---

## 📁 Repository Structure

```text
├── db/                    # Database layer: CDS data models and initial mock data (.csv)
├── srv/                   # Backend layer: CAP service definitions (.cds) and custom logic (.js)
├── app/                   # Frontend layer: SAPUI5 / Fiori application assets
├── mta.yaml               # Multi-Target Application deployment configuration
└── README.md              # Project documentation