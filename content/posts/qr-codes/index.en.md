---
weight: 4
title: "QR Codes"
date: 2024-06-17T21:57:40+01:00
lastmod: 2024-07-08T15:00:00+01:00
draft: false
author: "Thomas Schwarz"
authorLink: "https://schwarz-informatik.at"
description: "QR Codes"
images: []
resources:
- name: "featured-image"
  src: "featured-image.png"

tags: ["QR Codes", "Security"]
categories: ["Security"]

lightgallery: true
---
QR Code basierte Phishing Attacken gibt es schon seit Jahren.  

<!--more-->

Auf der Seite der Verteidiger wurde zur Erkennung solcher Angriffe bisher auf OCR (optical character recognition) zurückgegriffen. Mit Hilfe von OCR wurde der Text aus dem QR-Code extrahiert und dann wie ein “normaler” Link geprüft. Die Angreifer haben nun auf diese Schutzmaßnahme reagiert.  

Die aktuelle Lösung ist ein QR-Code, der von OCR nicht erkannt wird. Warum das? Weil der QR-Code nicht als Bild eingefügt wird, sondern als HTML. Mehr oder weniger eine aktuelle Version von ASCII Art. Alles, was man wissen muss, ist die Schriftart und die passenden Zeichen. Bei einem ersten Versuch war sogar Word als Editor gut zu nutzen. Nach 20 Minuten war mein hingezeichneter HMTL-ASCII-QR-Code fertig und ich konnte ihn problemlos abscannen. 

Wie kann man sich schützen? Als End User gibt es keine Möglichkeit den Unterschied zu erkennen. Es bleibt hier nur die Vorsicht. Für die IT-Pros gibt es auch noch keine Toolsupport. Was ich aber empfehlen würde: Im Mail Filter auf die Verwendung bestimmter Unicode Zeichen zu filtern. Zumindest auf 0x2580, 0x2584, 0x2588. Damit ist ein minimaler Schutz vorhanden und die False-Positiv Rate sollte gering sein. 

[Check Point](https://blog.checkpoint.com/harmony-email/the-evolution-of-qr-code-phishing-ascii-based-qr-codes/)
