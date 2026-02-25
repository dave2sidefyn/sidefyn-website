export type AgbSection = {
  title: string;
  items: string[];
};

export const agbSections: AgbSection[] = [
  {
    title: '1. Geltungsbereich',
    items: [
      'Diese AGB gelten für alle Leistungen der sidefyn GmbH, sofern nichts Abweichendes schriftlich vereinbart wurde.',
      'Entgegenstehende oder abweichende Bedingungen des Kunden gelten nur bei ausdrücklicher schriftlicher Zustimmung.',
    ],
  },
  {
    title: '2. Angebot und Vertragsschluss',
    items: [
      'Offerten sind 30 Tage gültig, sofern nichts anderes angegeben ist.',
      'Ein Vertrag kommt durch schriftliche Bestätigung oder durch Beginn der Leistungserbringung zustande.',
      'Maßgebend für den Leistungsumfang sind die Offerte und allfällige Pflichtenhefte oder Spezifikationen.',
    ],
  },
  {
    title: '3. Leistungen und Mitwirkungspflichten',
    items: [
      'Der Kunde liefert Inhalte, Zugänge und Entscheidungen fristgerecht.',
      'Verzögerungen in der Mitwirkung können zu Terminverschiebungen führen.',
      'Änderungen und Zusatzleistungen werden separat offeriert.',
    ],
  },
  {
    title: '4. Abnahme',
    items: [
      'Der Kunde prüft die Leistung innert 10 Arbeitstagen und bestätigt die Abnahme schriftlich.',
      'Ohne Rückmeldung innerhalb der Frist gilt die Leistung als abgenommen.',
      'Mängel werden nach angemessener Frist behoben.',
    ],
  },
  {
    title: '5. Preise und Zahlung',
    items: [
      'Alle Preise verstehen sich in CHF und exkl. MWST, sofern nicht anders vermerkt.',
      'Rechnungen sind innert 30 Tagen ab Rechnungsdatum ohne Abzug fällig.',
      'Bei Zahlungsverzug ist die sidefyn GmbH berechtigt, Leistungen zu pausieren.',
    ],
  },
  {
    title: '6. Hosting und Drittanbieter',
    items: [
      'Hosting erfolgt je nach Projekt über Drittanbieter.',
      'Für Verfügbarkeit, Sicherheit und Leistungen dieser Anbieter gelten deren Bedingungen.',
      'Kosten für Drittanbieter werden separat verrechnet, sofern nicht anders vereinbart.',
    ],
  },
  {
    title: '7. Nutzungsrechte',
    items: [
      'Der Kunde erhält nach vollständiger Zahlung ein einfaches, zeitlich und räumlich unbeschränktes Nutzungsrecht am Ergebnis.',
      'Vorlagen, Bibliotheken, Tools und Know-how der sidefyn GmbH bleiben deren Eigentum.',
      'Die sidefyn GmbH darf Projekte als Referenz nennen, sofern der Kunde nicht schriftlich widerspricht.',
    ],
  },
  {
    title: '8. Gewährleistung',
    items: [
      'Die sidefyn GmbH behebt nachgewiesene Mängel innerhalb angemessener Frist.',
      'Mängel, die durch Änderungen des Kunden oder Dritter verursacht wurden, sind ausgeschlossen.',
    ],
  },
  {
    title: '9. Haftung',
    items: [
      'Die Haftung wird auf Vorsatz und grobe Fahrlässigkeit beschränkt.',
      'Eine Haftung für indirekte Schäden, entgangenen Gewinn oder Folgeschäden ist ausgeschlossen.',
      'Die Haftungssumme ist höchstens auf die Auftragssumme begrenzt.',
    ],
  },
  {
    title: '10. Vertraulichkeit und Datenschutz',
    items: [
      'Beide Parteien behandeln vertrauliche Informationen vertraulich.',
      'Die Datenverarbeitung erfolgt gemäss der Datenschutzerklärung.',
    ],
  },
  {
    title: '11. Kündigung',
    items: [
      'Eine Kündigung aus wichtigem Grund bleibt vorbehalten.',
      'Bereits erbrachte Leistungen sind nach Aufwand zu vergüten.',
    ],
  },
  {
    title: '12. Anwendbares Recht und Gerichtsstand',
    items: [
      'Es gilt Schweizer Recht.',
      'Gerichtsstand ist Bern, Schweiz.',
    ],
  },
];
