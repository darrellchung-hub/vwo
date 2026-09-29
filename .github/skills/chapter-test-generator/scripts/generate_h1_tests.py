from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
SUBJECT = "History"
TOPIC = "World-War-I"
OUTPUT = ROOT / "output" / SUBJECT / TOPIC


def q(number, label, points, source, en, nl, answer_en, answer_nl):
    return {
        "number": number,
        "label": label,
        "points": points,
        "source": source,
        "en": en,
        "nl": nl,
        "answer_en": answer_en,
        "answer_nl": answer_nl,
    }


PASS = [
    q(1, "R", 2, "§1.2 Causes of the war", "Name the two groups that fought each other in World War I.", "Noem de twee groepen die tijdens de Eerste Wereldoorlog tegen elkaar vochten.", "The Allies and the Central Powers.", "De Geallieerden en de Centralen.",),
    q(2, "R", 2, "§1.2 Causes of the war", "What did nationalism mean in this chapter?", "Wat betekende nationalisme in dit hoofdstuk?", "The belief that love for one's own people was very important, often combined with hatred of other peoples.", "De overtuiging dat liefde voor het eigen volk heel belangrijk was, vaak samen met haat tegen andere volken.",),
    q(3, "R", 2, "§1.2 Causes of the war", "What is militarism?", "Wat is militarisme?", "The high value placed on military values such as courage, discipline and fighting spirit.", "Het hoog waarderen van militaire waarden zoals moed, discipline en vechtlust.",),
    q(4, "R", 2, "§1.2 Causes of the war", "What happened during the arms race?", "Wat gebeurde er tijdens de wapenwedloop?", "Countries stockpiled increasingly strong weapons to become the best armed.", "Landen verzamelden steeds sterkere wapens om het best bewapend te zijn.",),
    q(5, "R", 2, "§1.1 Handling time", "How was local time determined before standard time?", "Hoe werd de plaatselijke tijd bepaald voordat er een standaardtijd was?", "Clock towers were set by the position of the sun; noon was when the sun reached its zenith.", "Klokkentorens werden ingesteld op de stand van de zon; het was twaalf uur als de zon haar hoogste punt bereikte.",),
    q(6, "R", 2, "§1.1 Handling time", "What problem did the telegraph solve for the railways?", "Welk probleem loste de telegraaf op voor de spoorwegen?", "It allowed station clocks to be synchronised exactly.", "De telegraaf maakte het mogelijk stationsklokken precies gelijk te zetten.",),
    q(7, "R", 2, "§1.1 Handling time", "Which place provided the standard time used by the railways in Great Britain?", "Welke plaats leverde de standaardtijd die de spoorwegen in Groot-Brittannië gebruikten?", "Greenwich, near London.", "Greenwich, bij Londen.",),
    q(8, "R", 2, "§1.1 Handling time", "What is a time zone?", "Wat is een tijdzone?", "A division of an area into a zone with the same official time.", "Een indeling van een gebied in een zone met dezelfde officiële tijd.",),
    q(9, "R", 2, "§1.1 An international civilisation", "What period did the French call la belle époque?", "Welke periode noemden de Fransen la belle époque?", "The prewar period from around 1890 to 1914.", "De vooroorlogse periode van ongeveer 1890 tot 1914.",),
    q(10, "R", 2, "§1.1 An international civilisation", "What is the idea of progress?", "Wat is de vooruitgangsgedachte?", "The idea that life keeps getting better.", "De gedachte dat het leven steeds beter wordt.",),
    q(11, "R", 2, "§1.1 The modern Olympic games", "Where and when were the first modern Olympic Games held?", "Waar en wanneer werden de eerste moderne Olympische Spelen gehouden?", "Athens, in 1896.", "Athene, in 1896.",),
    q(12, "R", 2, "§1.1 The modern Olympic games", "Who reintroduced the modern Olympic Games?", "Wie bracht de moderne Olympische Spelen opnieuw tot leven?", "The French historian Pierre de Coubertin.", "De Franse historicus Pierre de Coubertin.",),
    q(13, "T1", 2, "§1.1 Handling time", "Explain why railways needed a fixed time schedule.", "Leg uit waarom spoorwegen een vaste dienstregeling nodig hadden.", "Trains needed fixed departure and arrival times, even though local clocks showed different times.", "Treinen hadden vaste vertrek- en aankomsttijden nodig, terwijl plaatselijke klokken verschillende tijden aangaven.",),
    q(14, "T1", 2, "§1.2 Causes of the war", "Explain how nationalism and militarism increased international tension.", "Leg uit hoe nationalisme en militarisme de internationale spanning vergrootten.", "Nationalism encouraged rivalry and hostility between peoples; militarism glorified armies and encouraged countries to build more weapons.", "Nationalisme stimuleerde rivaliteit en vijandigheid tussen volken; militarisme verheerlijkte legers en stimuleerde landen om meer wapens te bouwen.",),
    q(15, "T1", 2, "§1.2 A quick start", "What happened in Sarajevo on 28 June 1914?", "Wat gebeurde er op 28 juni 1914 in Sarajevo?", "The Austrian crown prince Franz Ferdinand was assassinated.", "De Oostenrijkse kroonprins Franz Ferdinand werd vermoord.",),
    q(16, "T1", 3, "§1.2 A quick start", "Put these events in the correct order: Germany declared war on France; Austria declared war on Serbia; Germany declared war on Russia; Great Britain declared war on Germany.", "Zet deze gebeurtenissen in de juiste volgorde: Duitsland verklaarde Frankrijk de oorlog; Oostenrijk verklaarde Servië de oorlog; Duitsland verklaarde Rusland de oorlog; Groot-Brittannië verklaarde Duitsland de oorlog.", "1 Austria declared war on Serbia; 2 Germany declared war on Russia; 3 Germany declared war on France; 4 Great Britain declared war on Germany.", "1 Oostenrijk verklaarde Servië de oorlog; 2 Duitsland verklaarde Rusland de oorlog; 3 Duitsland verklaarde Frankrijk de oorlog; 4 Groot-Brittannië verklaarde Duitsland de oorlog.",),
    q(17, "T1", 2, "§1.2 A quick start", "What were trenches and where were they used?", "Wat waren loopgraven en waar werden ze gebruikt?", "Deeply dug hallways reinforced with sandbags and barbed wire; they were used along the Western Front.", "Diep uitgegraven gangen die met zandzakken en prikkeldraad waren versterkt; ze werden gebruikt aan het Westfront.",),
    q(18, "T1", 2, "§1.2 Fight at the eastern front", "What happened to Russia by early 1918?", "Wat was er begin 1918 met Rusland gebeurd?", "Russia made peace with Germany and gave enormous parts of southern Russia and Ukraine to Germany.", "Rusland sloot vrede met Duitsland en gaf grote delen van Zuid-Rusland en Oekraïne aan Duitsland.",),
    q(19, "T2", 2, "§1.2 Fight at the western front", "Why did the United States joining the Allies help change the war in the west?", "Waarom hielp de deelname van de Verenigde Staten aan de Geallieerden het verloop van de oorlog in het westen te veranderen?", "The United States supplied fresh soldiers; in 1918 a quarter of a million American soldiers arrived in France.", "De Verenigde Staten leverden verse soldaten; in 1918 kwamen een kwart miljoen Amerikaanse soldaten in Frankrijk aan.",),
    q(20, "T2", 1, "§1.1 and §1.2", "Give one contrast between the idea of progress before 1914 and the war after 1914.", "Geef één tegenstelling tussen de vooruitgangsgedachte vóór 1914 en de oorlog na 1914.", "Before 1914 many people expected life to improve; the war brought industrial violence, destruction and mass death.", "Vóór 1914 verwachtten veel mensen dat het leven beter zou worden; de oorlog bracht industriële geweld, verwoesting en massale sterfte.",),
]

EXCELLENT = [
    q(1, "R", 2, "§1.2 Causes of the war", "Name the Allies and Central Powers as described in the theory, including two example countries for each group.", "Noem de Geallieerden en de Centralen zoals beschreven in de theorie, met voor elke groep twee voorbeeldlanden.", "The Allies included Great Britain, France and Russia; the Central Powers included Germany and Austria.", "De Geallieerden omvatten Groot-Brittannië, Frankrijk en Rusland; de Centralen omvatten Duitsland en Oostenrijk.",),
    q(2, "R", 2, "§1.1 An international civilisation", "Define la belle époque and the idea of progress.", "Definieer la belle époque en de vooruitgangsgedachte.", "La belle époque was the idealised prewar period around 1890-1914; the idea of progress was the belief that life kept getting better.", "La belle époque was de geïdealiseerde vooroorlogse periode rond 1890-1914; de vooruitgangsgedachte was de overtuiging dat het leven steeds beter werd.",),
    q(3, "T1", 3, "§1.1 Handling time", "Explain the chain from local solar time to international time zones.", "Leg de ontwikkeling uit van plaatselijke zonnetijd naar internationale tijdzones.", "Local clocks followed the sun, so places had different times. Railways needed fixed schedules; the telegraph allowed clocks to synchronise. Greenwich became standard time, and international train traffic led to time zones in 1891.", "Plaatselijke klokken volgden de zon, waardoor plaatsen verschillende tijden hadden. Spoorwegen hadden vaste dienstregelingen nodig; de telegraaf maakte synchronisatie mogelijk. Greenwich werd standaardtijd en door internationaal treinverkeer kwamen er in 1891 tijdzones.",),
    q(4, "T1", 3, "§1.1 The modern Olympic games", "Give three reasons why the 1896 Olympic Games were modern rather than a simple repetition of the ancient Games.", "Geef drie redenen waarom de Olympische Spelen van 1896 modern waren en niet alleen een herhaling van de oude Spelen.", "Modern transport and prosperity brought many visitors; industrial society popularised sport; nationalism and the modern stopwatch made national competition and precise timing important.", "Modern vervoer en welvaart brachten veel bezoekers; de industriële samenleving maakte sport populair; nationalisme en de moderne stopwatch maakten nationale competitie en nauwkeurige tijdmeting belangrijk.",),
    q(5, "T1", 3, "§1.2 A quick start", "Explain how the assassination in Sarajevo led to a wider war. Include at least three links in the chain.", "Leg uit hoe de moord in Sarajevo tot een grotere oorlog leidde. Noem minstens drie verbanden in de keten.", "Austria blamed Serbia and declared war; Russia supported Serbia and Germany declared war on Russia; France mobilised and Germany declared war on France; Germany invaded neutral Belgium and Britain declared war on Germany.", "Oostenrijk gaf Servië de schuld en verklaarde de oorlog; Rusland steunde Servië en Duitsland verklaarde Rusland de oorlog; Frankrijk mobiliseerde en Duitsland verklaarde Frankrijk de oorlog; Duitsland viel het neutrale België binnen en Groot-Brittannië verklaarde Duitsland de oorlog.",),
    q(6, "T1", 3, "§1.2 Fight at the eastern front", "Describe the main course of the war in the east from 1914 to early 1918.", "Beschrijf het belangrijkste verloop van de oorlog in het oosten van 1914 tot begin 1918.", "Russia first invaded, was pushed back, then fought again in 1916. After the tsar stepped down in 1917, the new government continued the war, but desertions and surrender increased. In early 1918 Russia made peace with Germany and surrendered territory.", "Rusland viel eerst binnen, werd teruggedrongen en vocht in 1916 opnieuw. Nadat de tsaar in 1917 was afgetreden, zette de nieuwe regering de oorlog voort, maar desertie en overgave namen toe. Begin 1918 sloot Rusland vrede met Duitsland en stond gebied af.",),
    q(7, "T2", 3, "§1.2 Fight at the western front", "Why did the Western Front become a trench war instead of a quick German victory?", "Waarom werd het Westfront een loopgravenoorlog in plaats van een snelle Duitse overwinning?", "The German advance was halted near France. The armies dug in behind reinforced trenches; modern weapons caused enormous casualties while the front barely moved.", "De Duitse opmars werd bij Frankrijk gestopt. De legers groeven zich in achter versterkte loopgraven; moderne wapens veroorzaakten enorme verliezen terwijl het front nauwelijks verschoof.",),
    q(8, "T2", 3, "§1.2 Fight at the western front", "What does Remarque's description of inexperienced recruits show about modern trench warfare? Give two conclusions.", "Wat laat Remarques beschrijving van onervaren rekruten zien over de moderne loopgravenoorlog? Geef twee conclusies.", "The fighting required knowledge and experience, and new weapons such as artillery and poison gas could kill soldiers who did not know how to respond.", "De strijd vereiste kennis en ervaring, en nieuwe wapens zoals artillerie en gifgas konden soldaten doden die niet wisten hoe ze moesten reageren.",),
    q(9, "T2", 3, "§1.2 Fight at the western front", "Explain two reasons why the Allies eventually became stronger in 1918.", "Leg twee redenen uit waarom de Geallieerden in 1918 uiteindelijk sterker werden.", "The United States entered the war and supplied fresh soldiers; the Allies used new weapons such as tanks, improved aircraft bombing and more accurate artillery.", "De Verenigde Staten gingen de oorlog in en leverden verse soldaten; de Geallieerden gebruikten nieuwe wapens zoals tanks, verbeterde bombardementen vanuit vliegtuigen en nauwkeuriger artillerie.",),
    q(10, "T2", 3, "§1.2 Fight at the western front", "Explain why civilians were also victims of the war, not only soldiers.", "Leg uit waarom burgers ook slachtoffers van de oorlog waren en niet alleen soldaten.", "Front regions were destroyed, civilians were murdered or taken away, and entire populations were forced to flee because armies distrusted them.", "Frontgebieden werden verwoest, burgers werden vermoord of weggevoerd en hele bevolkingen moesten vluchten omdat legers hen wantrouwden.",),
    q(11, "T2", 3, "§1.2 Eastern and western fronts", "Compare the Eastern and Western Fronts in terms of movement and outcome by early 1918.", "Vergelijk het Oost- en Westfront wat betreft beweging en uitkomst begin 1918.", "The Western Front barely moved for years and ended with Germany's defeat. In the east, territory changed hands more, and Russia made peace with Germany and surrendered land in early 1918.", "Aan het Westfront verschoof het front jarenlang nauwelijks en eindigde de oorlog met de nederlaag van Duitsland. In het oosten wisselde gebied vaker van bezetter en sloot Rusland begin 1918 vrede met Duitsland waarbij het land afstond.",),
    q(12, "I", 2, "§1.1 An international civilisation and §1.2 Fight at the western front", "Was the optimism of the idea of progress justified in 1900? Give one argument from each section.", "Was het optimisme van de vooruitgangsgedachte in 1900 gerechtvaardigd? Geef één argument uit elke paragraaf.", "Partly: technology, transport, hygiene, prosperity and international culture improved life, but industrial technology also made mass violence and destruction possible in the war.", "Gedeeltelijk: technologie, vervoer, hygiëne, welvaart en internationale cultuur verbeterden het leven, maar industriële technologie maakte tijdens de oorlog ook massaal geweld en verwoesting mogelijk.",),
    q(13, "I", 4, "§1.2 Causes of the war and A quick start", "Which mattered more in causing World War I: long-term tensions or the Sarajevo assassination? Build an argument using both.", "Wat was belangrijker als oorzaak van de Eerste Wereldoorlog: langdurige spanningen of de moord in Sarajevo? Bouw een argument met beide.", "The assassination was the immediate trigger, but nationalism, militarism, alliances, territorial ambitions and the arms race made a general war possible and allowed the crisis to spread.", "De moord was de directe aanleiding, maar nationalisme, militarisme, bondgenootschappen, gebiedsambities en de wapenwedloop maakten een algemene oorlog mogelijk en lieten de crisis uitbreiden.",),
    q(14, "I", 3, "§1.1 and §1.2", "Explain how modernisation could produce both international cooperation and world war. Use at least two examples from the theory.", "Leg uit hoe modernisering zowel internationale samenwerking als een wereldoorlog kon veroorzaken. Gebruik minstens twee voorbeelden uit de theorie.", "Modern transport, telegraphy, tourism, exhibitions and international culture connected people and countries. The same industrial society produced mass armies and weapons, while nationalism and militarism turned connections into rivalry and war.", "Modern vervoer, telegrafie, toerisme, tentoonstellingen en internationale cultuur verbonden mensen en landen. Dezelfde industriële samenleving bracht massale legers en wapens voort, terwijl nationalisme en militarisme verbindingen in rivaliteit en oorlog veranderden.",),
]


def set_cell_shading(cell, fill):
    properties = cell._tc.get_or_add_tcPr()
    shading = OxmlElement("w:shd")
    shading.set(qn("w:fill"), fill)
    properties.append(shading)


def add_bilingual(paragraph, en, nl, italic_nl=True):
    paragraph.add_run(en)
    paragraph.add_run("\n")
    dutch = paragraph.add_run(nl)
    dutch.italic = italic_nl


def setup_document(document, title):
    section = document.sections[0]
    section.top_margin = Inches(0.65)
    section.bottom_margin = Inches(0.65)
    section.left_margin = Inches(0.75)
    section.right_margin = Inches(0.75)
    styles = document.styles
    styles["Normal"].font.name = "Aptos"
    styles["Normal"].font.size = Pt(10)
    document.add_heading(title, 0)


def add_header(document, level, total_points, answer_key=False):
    table = document.add_table(rows=4, cols=2)
    table.style = "Table Grid"
    rows = [
        ("Subject / Vak", "History / Geschiedenis"),
        ("Book / Boek", "Geschiedeniswerkplaats 3e editie 3VWO English Edition"),
        ("Chapter / Hoofdstuk", "H1 World War I: 1.1 and 1.2"),
        ("Level / Niveau", level + (" answer key / antwoordmodel" if answer_key else "")),
    ]
    for row, (left, right) in zip(table.rows, rows):
        row.cells[0].text = left
        row.cells[1].text = right
        set_cell_shading(row.cells[0], "D9EAF7")
    if not answer_key:
        document.add_paragraph("Time / Tijd: 45 minutes    Total / Totaal: %d points    Name / Naam: ____________________    Date / Datum: __________" % total_points)
    else:
        document.add_paragraph("Total / Totaal: %d points" % total_points)
    document.add_paragraph()


def add_questions(document, questions, answer_key=False):
    for item in questions:
        p = document.add_paragraph()
        if answer_key:
            p.add_run(f"{item['number']}. [{item['label']}, {item['points']}p] Source / Bron: {item['source']}").bold = True
            p.add_run("\n")
            add_bilingual(p, item["answer_nl"], item["answer_en"])
            p.add_run("\nPoints / Punten: ")
            p.add_run(f"{item['points']}p available; award credit for the stated elements. / {item['points']}p beschikbaar; geef punten voor de genoemde onderdelen.")
        else:
            p.add_run(f"{item['number']}. [{item['label']}, {item['points']}p]").bold = True
            p.add_run("\n")
            add_bilingual(p, item["nl"], item["en"])
            document.add_paragraph("________________________________________________________________________________")
            if item["points"] >= 3:
                document.add_paragraph("________________________________________________________________________________")


def add_grading(document, total):
    document.add_heading("Grading / Beoordeling", 1)
    document.add_paragraph("Grade / Cijfer = 1 + 9 x (points scored / total points), rounded to one decimal. / Cijfer = 1 + 9 x (behaalde punten / totaal aantal punten), afgerond op één decimaal.")
    table = document.add_table(rows=1, cols=3)
    table.style = "Table Grid"
    table.rows[0].cells[0].text = "Points / Punten"
    table.rows[0].cells[1].text = "Grade / Cijfer"
    table.rows[0].cells[2].text = "Review / Herhaal"
    for cell in table.rows[0].cells:
        set_cell_shading(cell, "D9EAF7")
    for points in [0, 10, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40]:
        grade = 1 + 9 * points / total
        row = table.add_row().cells
        row[0].text = str(points)
        row[1].text = f"{grade:.1f}"
        row[2].text = "Review §1.1" if points < total * 0.5 else ("Review §1.2" if points < total * 0.75 else "Keep practising / Blijf oefenen")


def build_test(filename, title, level, questions):
    document = Document()
    setup_document(document, title)
    total = sum(item["points"] for item in questions)
    add_header(document, level, total)
    document.add_paragraph("Instructions / Instructies: Answer every question. English comes first; Dutch is italic below it. / Beantwoord elke vraag. Engels staat eerst; Nederlands staat er cursief onder.")
    add_questions(document, questions)
    document.save(OUTPUT / filename)


def build_key(filename, title, level, questions):
    document = Document()
    setup_document(document, title)
    total = sum(item["points"] for item in questions)
    add_header(document, level, total, answer_key=True)
    document.add_paragraph("Answers are model answers. Equivalent answers grounded in the theory are acceptable. / Dit zijn modelantwoorden. Gelijkwaardige antwoorden die op de theorie zijn gebaseerd zijn goed.")
    add_questions(document, questions, answer_key=True)
    add_grading(document, total)
    document.save(OUTPUT / filename)


def markdown_header(level, total_points, answer_key=False):
    lines = [
        "| Field / Veld | Details / Details |",
        "|---|---|",
        "| Subject / Vak | History / Geschiedenis |",
        "| Book / Boek | Geschiedeniswerkplaats 3e editie 3VWO English Edition |",
        "| Chapter / Hoofdstuk | H1 World War I: 1.1 and 1.2 |",
        f"| Level / Niveau | {level}{' answer key / antwoordmodel' if answer_key else ''} |",
        f"| Total / Totaal | {total_points} points / punten |",
    ]
    if not answer_key:
        lines.append("| Time / Tijd | 45 minutes / minuten |")
        lines.append("| Name / Naam | ____________________    Date / Datum: __________ |")
    return lines


def markdown_questions(questions, answer_key=False):
    lines = []
    for item in questions:
        if answer_key:
            lines.extend([
                f"## {item['number']}. [{item['label']}, {item['points']}p]",
                f"**Source / Bron:** {item['source']}",
                "",
                f"*{item['answer_nl']}*",
                "",
                item["answer_en"],
                "",
                f"**Points / Punten:** {item['points']}p available; award credit for the stated elements. / {item['points']}p beschikbaar; geef punten voor de genoemde onderdelen.",
                "",
            ])
        else:
            lines.extend([
                f"## {item['number']}. [{item['label']}, {item['points']}p]",
                f"*{item['nl']}*",
                "",
                item["en"],
                "",
                "________________________________________________________________________________",
                "",
            ])
            if item["points"] >= 3:
                lines.extend(["________________________________________________________________________________", ""])
    return lines


def markdown_grading(total):
    lines = [
        "## Grading / Beoordeling",
        "Grade / Cijfer = 1 + 9 x (points scored / total points), rounded to one decimal. / Cijfer = 1 + 9 x (behaalde punten / totaal aantal punten), afgerond op één decimaal.",
        "",
        "| Points / Punten | Grade / Cijfer | Review / Herhaal |",
        "|---:|---:|---|",
    ]
    for points in [0, 10, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40]:
        grade = 1 + 9 * points / total
        review = "Review §1.1" if points < total * 0.5 else ("Review §1.2" if points < total * 0.75 else "Keep practising / Blijf oefenen")
        lines.append(f"| {points} | {grade:.1f} | {review} |")
    return lines


def build_markdown(filename, title, level, questions, answer_key=False):
    total = sum(item["points"] for item in questions)
    lines = [f"# {title}", ""]
    lines.extend(markdown_header(level, total, answer_key))
    lines.append("")
    if answer_key:
        lines.extend([
            "Answers are model answers. Equivalent answers grounded in the theory are acceptable.",
            "",
            "*Dit zijn modelantwoorden. Gelijkwaardige antwoorden die op de theorie zijn gebaseerd zijn goed.*",
            "",
        ])
    else:
        lines.extend([
            "*Instructies: Beantwoord elke vraag. Nederlands staat eerst; Engels staat eronder.*",
            "",
            "Instructions: Answer every question. Dutch comes first; English follows below it.",
            "",
        ])
    lines.extend(markdown_questions(questions, answer_key))
    if answer_key:
        lines.extend(markdown_grading(total))
    else:
        lines.extend([
            "**Klik om de verborgen antwoorden te tonen / Click to show hidden answers:**",
            "",
            "<details>",
            "<summary>Antwoorden / Answers</summary>",
            "",
            "*Dit zijn modelantwoorden. Gelijkwaardige antwoorden die op de theorie zijn gebaseerd zijn goed.*",
            "",
        ])
        lines.extend(markdown_questions(questions, answer_key=True))
        lines.extend(markdown_grading(total))
        lines.extend(["", "</details>"])
    (OUTPUT / filename).write_text("\n".join(lines) + "\n", encoding="utf-8")


OUTPUT.mkdir(exist_ok=True)
build_markdown("History_H1_Test-A_Pass.md", "H1 World War I - Test A / Pass level", "Pass level / Basisniveau", PASS)
build_markdown("History_H1_Test-B_Excellent.md", "H1 World War I - Test B / Excellent level", "Excellent level / Uitstekend niveau", EXCELLENT)
build_markdown("History_H1_Test-A_Pass_AnswerKey.md", "H1 World War I - Test A / Pass level - Answer key", "Pass level / Basisniveau", PASS, answer_key=True)
build_markdown("History_H1_Test-B_Excellent_AnswerKey.md", "H1 World War I - Test B / Excellent level - Answer key", "Excellent level / Uitstekend niveau", EXCELLENT, answer_key=True)
print("Created tests and standalone answer keys in", OUTPUT)
