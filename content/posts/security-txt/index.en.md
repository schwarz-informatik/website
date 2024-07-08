---
weight: 4
title: "Security.txt"
date: 2024-06-22T21:57:40+01:00
lastmod: 2024-07-08T15:00:00+01:00
draft: true
author: "Thomas Schwarz"
authorLink: "https://schwarz-informatik.at"
description: "Security.txt"
images: []
resources:
- name: "featured-image"
  src: "featured-image.png"

tags: ["RFC9116", "Security"]
categories: ["Security"]

lightgallery: true
---
Wem melde ich eine Schwachstelle? 

<!--more-->

So überraschend die Frage im ersten Moment auch klingen mag, so kompliziert kann es sein den richtigen Ansprechpartner für eine gefundene Schwachstelle zu finden. Beispielsweise wird beim "responsible disclosure" zuerst der Hersteller/Betreiber informiert. Mit diesem wird dann eine Lösung erarbeitet, umgesetzt und getestet. Erst dann erfolgt die Veröffentlichung der Schwachstelle.

Ganz am Anfang stellt sich aber die Frage, wer muss informiert werden und wie? Um diese Fragen zu beantworten wurde der IETF RFC 9116 geschaffen. In diesem RFC wird der Aufbau einer Datei definiert, die die Kontaktdaten des "Security-Teams" einer Website/Domain und hoffentlich auch eines CERTs bekannt gibt. 

Diese Datei ist die "security.txt" und laut RFC ist diese unter https://<DOMAIN>/.well-known/security.txt zu finden. In meinem Fall ist das https://schwarz-informatik.at/.well-known/security.txt . 

Wie sieht das jetzt in der Realität aus? Von den Top 100 Unternehmen in Vorarlberg haben 3 eine Security.txt Datei angeboten. (Stand Anfang Juli 2024) Nur ein Unternehmen davon in der empfohlenen Variante mit PGP-signierten Datei. Da gibt es also noch viel zu tun.

Natürlich darf jeder gerne die security.txt meiner Website als Vorlage verwenden. Mal schauen wie es dann 2025 aussieht.
