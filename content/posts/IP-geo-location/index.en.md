---
weight: 4
title: "IP Geo-Location"
date: 2024-06-25T21:57:40+01:00
lastmod: 2024-07-08T15:00:00+01:00
draft: false
author: "Thomas Schwarz"
authorLink: "https://schwarz-informatik.at"
description: "IP Geo-Location"
images: []
resources:
- name: "featured-image"
  src: "featured-image.png"

tags: ["TOR", "Perimeter", "Security"]
categories: ["Security"]

lightgallery: true
---
IP Geo-Locations nutzen. Warum das und wie richtig? 

<!--more-->
In allen aktuellen SIEM und SOAR-Lösungen werden IP Geo-Locations genutzt, um herauszufinden in welchem Land sich der User befindet. Warum? Entweder weil Daten nur in bestimmte Länder bekanntgegeben werden dürfen, also beispielsweise aufgrund der DSGVO oder des schweizerischen DSG. Oder aber, um die Angriffsoberfläche der Organisation zu minimieren. Hat eine Organisation beispielsweise keinen Standort in einem Land und dort auch keine Kunden, so kann der Datenfluss aus diesem Land geblockt werden. --> Es gibt keinen guten Grund für diesen Datenfluss.  

Zur Umgehung dieser Maßnahmen wird vorzugsweise auf VPN-Dienste zurückgegriffen. Per VPN-Dienst wird der Datenfluss umgeleitet und aus einem Zugriff aus Österreich kann dann beispielsweise ein Zugriff aus den USA werden. Das ist zum Testen solcher Geo-Location basierter Schutzmaßnahmen natürlich super, aber auch eine großartige Gegenmaßnahme gegen diesen Schutzmechanismus.  

IP Geo-Locations sind daher immer mit Vorsicht zu nutzen. Der Schein kann trügen. Ich erlebe regelmäßig Situationen in denen die IP Geo-Location nicht mit der Realität, also dem physikalischen Standort des Users/des Geräts, übereinstimmt. Das gilt es dann im Einzelfall zu prüfen. Bei diesen Prüfungen helfen VPN IP Listen. Eine solche Liste für das TOR-Netzwerk ist hier verlinkt.  

Meine Empfehlung ist, solche Listen IP-Listen direkt in das SIEM, SOAR System zu integrieren, um damit VPN getarnte Zugriffe zu erkennen. Damit verringert sich die Rate der False-Positives als auch der False-Negatives. Also ein doppelter Gewinn. 

[TOR Nodes](https://www.dan.me.uk/tornodes)
