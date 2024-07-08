---
weight: 4
title: "IoC Erkennung"
date: 2024-07-08T21:57:40+01:00
lastmod: 2024-07-08T15:00:00+01:00
draft: false
author: "Thomas Schwarz"
authorLink: "https://schwarz-informatik.at"
description: "IoC Erkennung"
images: []
resources:
- name: "featured-image"
  src: "featured-image.png"

tags: ["IoC", "Security"]
categories: ["Security"]

lightgallery: true
---
Indicators of Compromise – Warnsignale  

<!--more-->

Indicators of Compromise (IoC) sind Warnsignale in einer IT-Infrastruktur, die auf einen Angriff hinweisen. Bei solchen IoC kann es sich um File-Hashes, um Files, um URLs oder auch um IP-Adressen handeln.  

Konkret kann ein solcher IoC beispielsweise die IP-Adresse eines bekannten Command and Control Servers von einer Ransomware Gruppe sein. Gibt es aus dem eigenen Netzwerk Verbindungen zu diesem Server, so liegt zumindest der Verdacht nahe, dass eine Infektion vorhanden ist. In diesem hypothetischen Szenario kann das SOC nun aufgrund dieses IoC schon reagieren, bevor die Ransomware verschlüsselt und so einen größeren Schaden abwehren.  

Die Infrastruktur und den Datenverkehr permanent auf das Vorhandensein von IoC hin zu prüfen ist daher wichtig. Optimalerweise werden hier auf aktuelle und permanent gepflegte Listen (beispielsweise [ThreatFox | Browse IOCs (abuse.ch)](https://threatfox.abuse.ch/browse/)) verwendet. Diese Listen enthalten Informationen, die sowohl für die Abwehr (Firewall usw.) als auch für die Erkennung (SIEM, SOAR) wichtig sind. Da sich diese Listen sehr schnell (teilweise alle 5 Minuten) ändern, ist es wichtig den Update-Prozess von Firewall, SIEM, SOAR usw. Zu automatisieren. Hier kann bereits mit einem einfachen Script sehr viel erreicht werden. 

Nutzt ihr IoC? Wenn ja, welche Quellen nutzt ihr?  
