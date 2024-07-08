---
weight: 4
title: "Certificate Transparency"
date: 2024-07-08T21:57:40+01:00
lastmod: 2024-07-08T15:00:00+01:00
draft: false
author: "Thomas Schwarz"
authorLink: "https://schwarz-informatik.at"
description: "Certificate Transparency"
images: []
resources:
- name: "featured-image"
  src: "featured-image.png"

tags: ["Certificate Transparency", "CA", "SSL", "Security"]
categories: ["Security"]

lightgallery: true
---
Welche SSL-Zertifikate gibt es? Wurden Zertifikate auf meine Domains ausgestellt?  

<!--more-->

Ein SSL-Zertifikat ist eine großartige Sache. Es hilft uns Vertrauen aufzubauen und ist ein integraler Bestandteil von TLS und damit auch von HTTPS. Das Vertrauen in ein SSL-Zertifikat ist darin begründet, dass das Zertifikat von einer vertrauenswürdigen Stelle (Certificate Authority, kurz CA) ausgestellt/signiert wurde. Leider kam und kommt es auch zu Fällen, in denen von einer solchen CA fälschlicherweise Zertifikate ausgestellt wurden. Das ist ein potenzieller Angriffsvektor. Ein anderer, verwandter Angriffsvektor ist das von einem Angreifer an Domainname gewählt wird, der dem des Ziels ähnlich ist. Ist beispielsweise die Domain schwarz-informatik.at das Ziel, so kann der Angreifer schwarz-lnformatik.at für den Angriff nutzen. Auf den ersten Blick ist der Unterschied fast nicht zu sehen.  

Was kann nun gegen dieses Problem unternommen werden? Es können alle ähnlichen Domains aufgekauft werden. Möglich, ABER kostet in Summe doch ziemlich viel Geld und schützt nicht vor widerrechtlich ausgestellten Zertifikaten. Eine alternative Lösung nutzt die so genannte Certificate Transparency. Das ist ein öffentlicher und in Echtzeit aktualisierter Log aller erstellten SSL-Zertifikate. Dieser Log kann dann mittels Monitoring-Lösung auf die eigenen Domains hin geprüft werden. So wird zwar die Erstellung von falschen SSL-Zertifikaten nicht unterbunden, aber die Erkennung kann quasi in Echtzeit erfolgen. Im Besten Fall auch die Reaktion. 

Die Umsetzung einer solchen Maßnahme ist erstaunlich einfach und meiner Meinung nach für jedes Unternehmen machbar. Bei mir kümmert sich ein kleiner Container auf einem Raspberry Pi um dieses Thema.  

[Certstream (calidog.io)](https://certstream.calidog.io/) 
