import fs from "node:fs";
const f = "content/articles.json";
const A = JSON.parse(fs.readFileSync(f, "utf8"));

const NEW = [
{
  id: "buildings-that-stayed",
  title: "The buildings that stayed",
  category: "people",
  kind: "Analysis",
  standfirst: "The congregations left. The synagogues did not. What remains standing in India is the most concrete evidence this history has, and almost nobody has catalogued it.",
  sources: ["syn360-shaar", "syn360-parur", "syn360-kadavumbagam", "syn360-judah-hyam", "wjc-india", "britannica-paradesi"],
  status: "verified",
  body: [
    "The World Jewish Congress records roughly 4,800 Jews living in India in 2020, against earlier estimates of between 4,900 and 7,000 as of 1996. Set that against the buildings. There are synagogues in Mumbai, Pune, Thane, Kochi, Parur, Ernakulam, Mala, Chennamangalam, Kolkata and New Delhi. The buildings substantially outnumber the community that built them.",
    "This is the central physical fact about Jewish India today, and it is the reason this project treats the synagogue directory as its most important dataset rather than as a tourism page. When a community becomes very small, the archive stops being paper and starts being architecture. A building can be photographed, dated, measured and protected. A memory cannot.",
    "The Kerala pattern is the clearest case, and it is worth setting out in full because it repeats.",
    "Kadavumbagam Synagogue in Ernakulam ceased functioning as an active synagogue in 1972. In 1974 its Torah scrolls were shipped to the Cochin National Heritage Center. In 1991 the interior and the Aron Kodesh were transported to Moshav Nehalim in Israel for restoration. The building itself is still there, closed to worship, with a business in the front room and a guardian who lets visitors see the grounds.",
    "Parur Synagogue, built in 1615, went the same way in a different order. Its original bimah and Aron Kodesh were shipped to Israel in 1995 and replaced with reconstructions. Restoration of the building began in 2009.",
    "Read those two together and a sequence appears. First the congregation goes. Then the scrolls go, because scrolls are the part of a synagogue that must stay with a living community. Then the interior goes, because a museum in Israel can conserve it and an empty building in Kerala cannot. What is left standing is the shell, in the place where the community actually lived, with its contents four thousand kilometres away.",
    "Neither half of that is wrong. The scrolls belong with people who read them. The building belongs to the street it was built on. But the split means that anyone trying to understand Cochin Jewish life has to look in two countries, and that the Indian half of the evidence is the half nobody is systematically recording.",
    "Mumbai runs differently, because Mumbai still has a congregation. Shaar Harahamim, built in 1796 and rebuilt at Mandvi in 1860, is recorded as serving roughly 100 members with daily services in a building that seats 300. Keneseth Eliyahoo, built in 1884, has a regular gathering on Sabbaths and High Holidays. These are working buildings, not monuments, and the difference shows in how they are described: condition reports rather than restoration projects.",
    "New Delhi is a third case again. Judah Hyam Hall had its foundation stone laid on 12 February 1956 and was completed on 2 September 1956, with an annex added in 1979. It is the only building in this directory constructed after Indian independence, and its practice has adapted in ways the source records without embarrassment: the rabbi has never been ordained, the doors are open to people of all faiths, and women count towards the ten people required for a service. A very small congregation in a capital city made the rules work rather than letting the congregation fail.",
    "Put beside a seventeenth century trading synagogue in Kerala, that is a completely different kind of Jewish history. Both belong in the same directory, and flattening them into one story about decline would miss what is actually interesting about each.",
    "What this project can say with sources is above. What it cannot yet say is most of the rest. Five of the thirteen sites in the directory have no construction date recorded here, because no date has been read in a source this project has checked. Not one cemetery is recorded at all, and cemeteries are the most fragile category of all: unmarked, unvisited, and the first thing to be built over.",
    "That gap is the work. A complete, sourced, machine readable directory of Jewish sites in India does not exist. Building one is within reach of a small project with a camera and a habit of citing things."
  ]
},
{
  id: "meeting-in-mandvi",
  title: "A meeting in Mandvi, 1919",
  category: "history",
  kind: "Analysis",
  standfirst: "On 2 April 1919 a Bene Israel meeting on Zionism was held in a Bombay synagogue. It is a single dated line in a museum record, and it does more work than most whole chapters.",
  sources: ["syn360-shaar", "mea-2026"],
  status: "verified",
  body: [
    "The record of Shaar Harahamim synagogue in Mumbai, kept by Synagogues360 at ANU, the Museum of the Jewish People, contains a line that is easy to read past. On 2 April 1919, a Bene Israel meeting on Zionism was held at the synagogue.",
    "Consider what that date sits between. The State of Israel is twenty-nine years away. Indian independence is twenty-eight years away. India's recognition of Israel, on 17 September 1950, is thirty-one years away. Full diplomatic relations, in 1992, are seventy-three years away.",
    "In other words, a community in Bombay was meeting to discuss Zionism before either of the two states in this project's title existed. That single fact does more to justify the sentence this site opens with, that the relationship did not begin in 1992, than any amount of argument about civilisational affinity.",
    "It is worth being precise about what the record supports and what it does not. It supports that a meeting happened, that it was a Bene Israel meeting, that its subject was Zionism, that it took place at Shaar Harahamim, and that the date was 2 April 1919. It does not tell us who attended, what was resolved, what the tone was, whether the meeting was for or against, or whether it was one of many or the only one of its kind. A single line in a building's history is a pointer, not an account.",
    "This is exactly the kind of item this project exists to chase. The meeting was presumably minuted, reported, or at least mentioned in the Anglo Jewish or Indian press of the period. Bombay in 1919 had newspapers, and Jewish communal organisations kept records. Somewhere there is more than one line.",
    "Two further things make the date worth holding on to.",
    "The first is that it belongs to the Bene Israel specifically, not to Jews in India generally. The Bene Israel were Marathi speaking, long settled, and in 1919 largely a community of Bombay and the Konkan rather than recent arrivals with European connections. A Zionist meeting among that community is a different phenomenon from a Zionist meeting among, say, a recently arrived European Jewish population, and any account that blurs the two is missing the point.",
    "The second is that it complicates the standard periodisation. The usual story of India and Israel runs: Indian independence, then the creation of Israel, then Indian foreign policy decisions, then a gap, then 1992. In that story the Jewish communities of India appear only as objects, populations that later migrated. The 1919 meeting shows them as participants in an argument, three decades early, in their own building, in their own city.",
    "This project lists among its open questions why India recognised Israel in 1950 and waited until 1992 for full relations. There is a companion question that is smaller and more answerable: what were the Jewish communities of India themselves saying about all of this, and when did they start saying it? The answer to the second may not illuminate the first at all. Communities and foreign ministries are not the same actor. But it is a real question with a real archive behind it, and one dated meeting in April 1919 is the thread to pull."
  ]
},
{
  id: "sassoon-footprint",
  title: "The Sassoon footprint",
  category: "people",
  kind: "Analysis",
  standfirst: "One family arrives in Bombay in 1832. A century and a half later, a synagogue anniversary in that city draws the President of India.",
  sources: ["wjc-india", "pib-jews", "syn360-magen-david", "syn360-kneseth"],
  status: "verified",
  body: [
    "The Sassoon family arrived in Bombay in 1832, part of the nineteenth century movement of Baghdadi Jews leaving Iraq and neighbouring lands. The Press Information Bureau records that David Sassoon built institutions in the city that still serve Indian society. The World Jewish Congress records the arrival date. Between those two flat statements sits one of the more legible stories of institution building in colonial Bombay.",
    "The buildings are the visible part. Magen David synagogue, built in 1861 by David Sassoon in a Neo Classical style, with an elementary school for the study of the Torah on its grounds, expanded by his son in 1910. Keneseth Eliyahoo, built in 1884 by Jacob Elias Sassoon and his brother Albert in memory of their father Eliyahoo, in a Victorian style. Two synagogues, one school, twenty-three years apart, all from one family.",
    "The pattern in that list matters more than any individual building. A synagogue serves a congregation. A school attached to a synagogue serves a congregation that expects to still be there in a generation. The Sassoon institutional footprint in Bombay was built by people making long bets on a city, and it is the physical evidence that the Baghdadi community did not regard India as a waiting room.",
    "Two later facts show what those bets produced.",
    "The first is about who ends up in the building. Keneseth Eliyahoo was built by and for Baghdadi Jews. After 1941 the congregation received an influx of Jews from Bukhara, Persia and Iraq. From 1948, emigration to Israel ran the other way. Today the congregation is recorded as primarily Bene Israel. A building put up by one community in 1884 is now used by a different one, in the same city, under the same roof, with the same fittings. That is not decline. It is a building outliving the specific population that made it, which is what institutions are for.",
    "The second is about standing. The 125th anniversary of Keneseth Eliyahoo, in 2009, was attended by the President of India, the Governor of Maharashtra and the Ambassador of Israel. A synagogue anniversary drawing a head of state is a small, concrete, checkable data point about the position of the Jewish communities in Indian public life, and it is worth more than a page of general statements about tolerance.",
    "The Press Information Bureau list of Indian Jewish contributions runs wider than the Sassoons and is worth reading for its ordinariness. Edwyn Myers gave shape to the Films Division of India. Walter Kaufmann composed the signature tune for All India Radio. Doctor Reuben David founded the Kankaria Zoo in Ahmedabad. David Abraham Cheulkar became a household name as an actor. Lieutenant General J. F. R. Jacob is recorded for his contribution during the 1971 war with Pakistan.",
    "Notice what kind of list that is. It is not a list of community leaders or religious figures. It is a signature tune, a zoo, a film institution, a film career, and a war. These are people who show up in the history of Indian institutions rather than in the history of a minority, which is a different and stronger claim about belonging than any amount of assertion.",
    "This project holds each of those names as a single sourced line, which is honest and thin. Every one of them is a person with a full record somewhere: a service file, a filmography, an institutional archive. Turning eleven lines into eleven proper entries is straightforward work that nobody has done in one place."
  ]
},
{
  id: "shrinking-congregation",
  title: "What a shrinking congregation does",
  category: "people",
  kind: "Analysis",
  standfirst: "Judah Hyam Hall in Delhi changed its rules to survive. That is more interesting than any story about decline.",
  sources: ["syn360-judah-hyam", "wjc-india"],
  status: "verified",
  body: [
    "The Jewish Welfare Association in Delhi was formed in 1949. The foundation stone of Judah Hyam Hall was laid on 12 February 1956 and the building was completed on 2 September 1956. An annex was added in 1979. It serves roughly 50 local members, along with diplomats and visitors, with Sabbath and High Holiday services and bar and bat mitzvahs.",
    "Fifty people is not many. What is interesting is what fifty people did about it.",
    "The source records three departures from custom, stated without apology. The rabbi has never been ordained. The doors are open to people of all faiths. Women count towards the minyan, the ten people traditionally required for communal prayer.",
    "Each of those is a real adaptation with a real cost, and each is the sort of thing that would be contested in a larger community. In a congregation of fifty, in a city where the next synagogue is a very long way away, they are the difference between a service happening and not happening.",
    "This is worth saying plainly because the standard narrative about Jewish India is a narrative of loss. Populations fell from thousands to hundreds, communities emigrated, buildings emptied. All of that is true, and the numbers support it: the World Jewish Congress records roughly 4,800 Jews in India in 2020, against between 4,900 and 7,000 as of 1996.",
    "But loss is a description of a quantity, and it explains nothing about what the remaining people actually did. Judah Hyam Hall is the record of a group deciding that continuity mattered more than any single rule about who may be counted, and acting on that decision in 1956 and continuing to act on it. That is not a story about a community disappearing. It is a story about a community choosing which of its parts were load bearing.",
    "The contrast with Kerala sharpens it. In Kerala the buildings were kept and the practice moved to Israel: scrolls shipped in 1974, interiors shipped in 1991 and 1995, structures restored as heritage. In Delhi the practice was kept and the rules were adjusted around it. Two entirely different answers to the same shrinkage, and neither is obviously the wrong one.",
    "This is also why the phrase Indian Jewish community, in the singular, is a category error that this project keeps flagging. In one country, in living memory, you have a seventeenth century Kerala congregation whose bimah is now in a moshav, an 1884 Bombay synagogue built by Baghdadis and now used mainly by Bene Israel, and a 1956 Delhi hall with an unordained rabbi and women in the minyan. These do not share a story. They share a country.",
    "One caution about all of the above. Every fact in it comes from one institutional source, the Synagogues360 record kept by ANU, the Museum of the Jewish People, and the descriptions of practice were written at a particular moment. Congregational practice changes. If you know the present position at Judah Hyam Hall and it differs from this, the flag control on this page is the fastest route to correcting it."
  ]
},
{
  id: "civilisational-ties",
  title: "The trouble with civilisational ties",
  category: "method",
  kind: "Argument",
  standfirst: "The phrase does real work in speeches and almost none in research. A short case for retiring it, from a project that has it in its own name.",
  sources: ["mea-2026", "wjc-india"],
  status: "verified",
  body: [
    "Anyone reading about India and Israel encounters the phrase civilisational ties within about four paragraphs. Two ancient peoples, two enduring traditions, two survivors of long histories, natural partners. It is warm, it is popular on both sides, and it is close to content free.",
    "The problem is not that it is false. It is that it is unfalsifiable. There is no observation that would count against it. If the two countries cooperate closely, that is the civilisational tie expressing itself. If they do not, the tie is dormant, or obstructed by politics. A claim that cannot fail is not doing any explanatory work.",
    "The second problem is that it is available to anyone. Almost any pair of countries with long histories can be described as civilisationally linked, and the phrase gets applied to India and Iran, India and Greece, India and Egypt, India and Japan. If a description fits every pair, it distinguishes none of them.",
    "The third problem is the one that should worry anyone who cares about the subject. The phrase is often used to substitute for evidence rather than to summarise it. It is a way of asserting a relationship without having to produce a date, a document, or a name.",
    "Here is the alternative, and it is not more boring, it is considerably more interesting.",
    "Instead of civilisational ties, say: copper plates issued by Malabar rulers recording the standing of a Jewish community. Say: a synagogue built in Kochi in 1568 by traders including families exiled from Spain and Portugal. Say: the Sassoons arriving in Bombay in 1832 and building two synagogues and a school. Say: a Bene Israel meeting on Zionism at a Bombay synagogue on 2 April 1919. Say: recognition on 17 September 1950 and diplomatic relations in 1992, forty-two years apart. Say: 43 agricultural centres of excellence approved and 35 operational under a work plan covering 2024 to 2026.",
    "Every one of those is checkable. Every one of those can be wrong, which is what makes them worth stating. Together they describe something far more specific than a civilisational affinity: a long, uneven, interrupted, and mostly commercial and communal traffic between two regions, followed by a modern state relationship with a very particular shape.",
    "This project carries the word civilisations in its own name, and that is a deliberate tension worth naming. The word is there to mark a scope, that this site covers more than the diplomatic period, and not to make an argument. The moment it starts standing in for evidence on any page here, that page has failed its own standard.",
    "There is a fair objection to all this. Sometimes the resonance is real. When two societies both have long textual traditions, both have diaspora experiences, and both organise memory around a homeland, people in each recognise something in the other, and that recognition has effects on how they talk to each other. That is worth studying.",
    "But study it as what it is: a claim about how people in each country perceive the other, which is a question about perception, testable by asking them. That is a research programme. Civilisational ties, as usually deployed, is a way of not having one."
  ]
},
{
  id: "link-rot",
  title: "Government documents disappear",
  category: "method",
  kind: "Method",
  standfirst: "The single most common way a well sourced page becomes an unsourced page is that the source moves. Here is what this project does about it.",
  sources: ["mea-2026"],
  status: "verified",
  body: [
    "Almost every dated fact on this site rests on documents published by governments. The Ministry of External Affairs bilateral brief. Embassy pages. Press Information Bureau releases. These are the right sources to use. They are also, as a class, among the least stable documents on the internet.",
    "Government sites are reorganised. Briefs are replaced by newer briefs at new addresses. Press release systems are migrated and old identifiers stop resolving. A ministry updates a page in place, so the address still works but the content underneath a citation has changed and the citation is now wrong in a way nobody can see.",
    "For a project whose entire promise is that every claim carries a source, that is not a minor inconvenience. It is the main long term threat. A page citing a link that returns an error is functionally an unsourced page, and worse, it looks sourced.",
    "There are three defences and this project uses all three.",
    "The first is the accessed date. Every source in the register carries the date it was read. That does not preserve anything, but it tells a reader exactly which version of a living document a claim was drawn from, and it tells a future editor how stale a citation has become. A citation without an accessed date is a citation to a document that may no longer exist in the form described.",
    "The second is archiving. Any public web page can be submitted to a web archive, which stores a dated copy at a stable address. Submitting every source at the moment it is cited costs nothing and means that when the original moves, the evidence is still producible. This is the single highest value habit available to a zero budget research project, and it is the one most often skipped because it is invisible while it is working.",
    "The third is redundancy. Where a fact appears in more than one independent source, cite more than one. Several claims on this site rest on both the Ministry brief and the Embassy page. That is not padding. It means the claim survives either one of them going down.",
    "There is a fourth thing, which is not a defence but an obligation. When a source does die, say so on the page rather than quietly swapping in a replacement. A citation that changed is a fact about the record, and readers who checked the old one deserve to know.",
    "None of this is specific to India and Israel. It applies to any project that builds on government publishing. It is written down here because the promise on this site's About page, that nothing is published without a source, is only as good as the sources remaining findable, and a promise with a known failure mode should say what the failure mode is."
  ]
},
{
  id: "research-this-yourself",
  title: "How to research this subject yourself",
  category: "method",
  kind: "Guide",
  standfirst: "A practical route into India and Israel research for someone starting with nothing but an internet connection. The same route this project took.",
  sources: ["mea-2026", "eoi-telaviv", "pib-jews", "wjc-india", "britannica-paradesi", "syn360-search"],
  status: "verified",
  body: [
    "This project has no institutional access, no budget, and no archive card. Everything on this site was assembled from documents anyone can read. That is worth writing down as a method, because the biggest barrier to entry in this subject is not access. It is not knowing where to start.",
    "Start with the bilateral briefs. Both foreign ministries maintain a document describing the relationship with the other country. India's is published by the Ministry of External Affairs, carries a date, and lists visits, agreements, trade figures, cooperation sectors and community information. Read it whole, twice. The first read tells you what exists. The second, with a notebook, gives you a list of every dated event mentioned, which is your skeleton.",
    "Take the dates and leave the adjectives. A brief is a diplomatic document. Its dates and figures are the institution's own record and are strong evidence. Its descriptions of warmth and depth are framing and carry across into research as nothing at all.",
    "Read the embassy pages next, on both sides. Embassies publish things ministries do not: community information, event records, consular operations, lists of award recipients. The Embassy of India in Tel Aviv is where this project found the National Convention of Indian Jews, its host towns and years, and the Pravasi Bharatiya Samman recipients. None of that is in the ministry brief.",
    "Expect the two to disagree, and treat that as a finding rather than a nuisance. The ministry brief and the embassy page give different figures for the Indian origin population in Israel and for Indian citizens there. When that happens, record both, name the gap, and go looking for the definitions each used.",
    "For the community history, the reference institutions come first. The World Jewish Congress community page gives you the four communities and their outlines. Britannica gives you dated entries on individual sites. These will not be the last word on anything, and they are a reliable first word.",
    "Then go to the museums. This is the step most people skip and it is the richest. ANU, the Museum of the Jewish People, publishes Synagogues360, which holds building by building records for synagogues including those in India: dates, founders, architectural notes, congregation sizes, and what happened to the fittings. That is where the specific, checkable, unusual facts live. A museum record of a single building will tell you more than ten general articles about a community.",
    "For the modern relationship, the Press Information Bureau carries Indian government releases, which are dated, attributable and searchable.",
    "Two habits make the difference between notes and research.",
    "Record the accessed date for everything, every time. Government documents move constantly, and a citation without a date is a citation to a document that may no longer say what you think it says.",
    "Archive every source at the moment you cite it. A dated copy in a web archive costs nothing to make and is the only thing standing between your work and a dead link.",
    "Finally, a note on what this method cannot reach. Everything described here is published on the open internet in English. The material that would actually settle most of the open questions on this site is not: Marathi and Malayalam community records, Hebrew language scholarship, Indian and Israeli state archives, newspaper runs from the 1910s to the 1940s, and oral histories held by families rather than institutions. A project built from open web sources should be honest that it is working in the shallow end. The shallow end is deeper than most people assume, and it is not the whole pool."
  ]
},
{
  id: "what-is-an-mou",
  title: "What a memorandum of understanding actually is",
  category: "explainer",
  kind: "Explainer",
  standfirst: "Most of the India-Israel record consists of memoranda, work plans, dialogues and joint declarations. They are not the same as each other, and none of them is a treaty.",
  sources: ["mea-2026"],
  status: "verified",
  body: [
    "Read the India-Israel record and you meet a vocabulary: memorandum of understanding, agreement, joint declaration, work plan, letter of intent, terms of reference, dialogue. Coverage tends to treat all of these as deals signed. They are different instruments with different weight, and being able to tell them apart changes what the record looks like.",
    "A memorandum of understanding records that two parties have a shared intention and describes what each expects to do. In most cases it does not create obligations that a court or tribunal would enforce. It is a statement of direction, and it is the most common instrument in this record: on defence cooperation in November 2025, on water resources management in November 2016, on the industrial research and development initiative in May 2005, between India's diplomatic training institute and the Israeli foreign ministry in November 2025.",
    "An agreement, in the way these records use the word, is usually the heavier instrument. The 1993 agreement on agricultural cooperation and the 1993 agreement on science and technology cooperation are framework agreements, and the agricultural one was renewed in April 2025. The test of weight is not the word on the cover but whether the text creates commitments and how it enters into force in each country.",
    "A letter of intent is lighter than a memorandum. It records that both sides want to do something and intend to work out what. The letter of intent on water technology centres of excellence in May 2023 is an example.",
    "Terms of reference are lighter still in commitment and heavier in signal. They set the scope of a negotiation that has not happened yet: what will be discussed, what is excluded, how the work will run. The terms of reference for a free trade agreement agreed between 20 and 22 November 2025 commit neither side to any outcome. They commit both to a conversation.",
    "A joint declaration is a public statement of shared position, made together. The joint declaration on fisheries and aquaculture during the Indian fisheries minister's visit from 13 to 15 January 2026 is one. It creates visibility rather than obligation.",
    "A work plan is the operational layer, and it is often the most informative item in a record because it says what will actually be done and by when. The sixth work plan on agriculture covers 2024 to 2026 and is the framework the centres of excellence run under. The Joint Work Plan 2026 was agreed on the external affairs minister's visit of 16 to 17 December 2025.",
    "A dialogue is a recurring meeting. The Cyber Policy Dialogue on 27 March 2025 and the Export Control Dialogue on 27 and 28 October 2025 are not agreements at all. They are institutional habits, and habits are underrated: a dialogue that has run for years means officials on both sides know each other, which is the substrate every agreement rests on.",
    "Finally, the investment agreement. A bilateral investment agreement, signed during the Israeli finance minister's visit of 8 to 10 September 2025, is a proper treaty level instrument in most systems, creating protections for investors from each country in the other. It is the heaviest thing in the recent record, and it attracted less attention than the free trade terms of reference, which are lighter.",
    "The practical consequence for reading this subject: count instruments by weight, not by number. A year with one investment agreement and one framework renewal is a heavier year than one with six memoranda and four dialogues, even though the second sounds busier."
  ]
},
{
  id: "evacuations",
  title: "Ajay and Sindhu",
  category: "relations",
  kind: "Analysis",
  standfirst: "Twice in under two years, India moved its citizens out of the region by name and by operation. Evacuation records are the least ceremonial and most revealing part of a bilateral relationship.",
  sources: ["mea-2026", "eoi-telaviv"],
  status: "verified",
  body: [
    "Between 12 and 22 October 2023, over 1,300 people were evacuated under Operation Ajay. Between 22 and 25 June 2025, around 818 people were evacuated under Operation Sindhu.",
    "These two lines sit in the Ministry of External Affairs bilateral brief among the agreements and visits, and they are of a different kind from everything around them. An agreement records what two governments intend. An evacuation records what one government did when the situation stopped being about intentions.",
    "Three things make evacuation records unusually informative.",
    "The first is that they are hard to inflate. A visit can be described as historic and a memorandum as landmark, and neither adjective can be checked. A number of people flown out of a country in a named window is a logistics fact. It is either right or wrong, and there are aircraft manifests behind it.",
    "The second is that they reveal the size and shape of the exposed population. India maintains a substantial civilian presence in Israel. The ministry brief records over 42,000 Indian citizens there, while the Embassy of India in Tel Aviv records about 18,000, described as mainly caregivers employed by Israeli families, diamond traders, information technology professionals and students. This project shows both figures because the two do not agree.",
    "Read the evacuation numbers against either figure and the same point holds: the number moved is a small fraction of the number present. Over 1,300 in 2023 and around 818 in 2025 are not mass withdrawals. They are the departure of those who chose or needed to leave, out of a population that largely stayed.",
    "That composition matters for what the relationship actually consists of. The embassy's description of the Indian population is not a diplomatic or corporate population. Caregivers working in Israeli homes are the largest category named. Whatever the strategic relationship is doing at ministerial level, the daily human contact between the two countries runs substantially through domestic care work, and that is a fact about the relationship that no joint statement will mention.",
    "The third thing is timing. October 2023 and June 2025 are both moments of regional conflict. The brief also records telephone calls between the two Prime Ministers on 13 June 2025 in connection with the conflict involving Iran, and on 9 October 2025 in connection with the Gaza peace plan. Contact intensifies when the region does. That is unsurprising, and it is worth having on the record rather than assumed, because it defines what the relationship is for on the days it matters most.",
    "This project does not have, and does not claim, the operational detail: routes, aircraft, who qualified, how the decision to launch was taken, or what happened to those who stayed. Those things are knowable, from parliamentary answers, ministry statements and press coverage at the time. They are on the list."
  ]
},
{
  id: "the-2025-run",
  title: "Reading the 2025 run",
  category: "relations",
  kind: "Analysis",
  standfirst: "One calendar year in the record carries an investment agreement, a defence memorandum, a trade negotiation opening, four leader level phone calls and ministerial traffic in most sectors. That density is itself the finding.",
  sources: ["mea-2026"],
  status: "verified",
  body: [
    "Set out the 2025 entries in the Ministry of External Affairs bilateral brief in order and the year looks like this.",
    "In February, the Israeli economy minister visits from 11 to 13 February, and a joint postage stamp pairing Holi and Purim is released. The Israeli foreign minister visits on 15 February. In March, the Cyber Policy Dialogue is held on 27 March, the director general of the Israeli foreign ministry visits from 17 to 20 March, and a deputy national security adviser visits from 11 to 14 February. In April, the Israeli agriculture minister visits from 7 to 10 April, and the 1993 agricultural cooperation agreement is renewed. Also in April, on the 24th, the Israeli Prime Minister telephones the Indian Prime Minister with condolences.",
    "In June, a call between the two Prime Ministers on the 13th in connection with the conflict involving Iran, and Operation Sindhu evacuates around 818 people between 22 and 25 June. In September, the Israeli finance minister visits from 8 to 10 September and a bilateral investment agreement is signed. In October, a call on the 9th in connection with the Gaza peace plan, and the Export Control Dialogue on 27 and 28 October.",
    "In November, a memorandum of understanding on defence cooperation on 4 November alongside the seventeenth meeting of the defence joint working group, the Israeli foreign minister visiting again, a memorandum between India's Sushma Swaraj Institute and the Israeli foreign ministry, and the Indian commerce and industry minister visiting from 20 to 22 November, where terms of reference for a free trade agreement are agreed. In December, a call on the 10th on the regional situation, the Indian external affairs minister in Israel on 16 and 17 December agreeing the Joint Work Plan for 2026, and an agreement for an India Chair at Tel Aviv University.",
    "Then January 2026: a New Year call between the two Prime Ministers on the 7th, and the Indian fisheries minister in Israel from 13 to 15 January signing a joint declaration on fisheries and aquaculture.",
    "Three observations follow from the density rather than from any single item.",
    "The first is that the traffic is ministerial rather than leader level. There was no state visit in either direction in 2025. What there was instead was economy, finance, agriculture, tourism, transport, foreign affairs, commerce and fisheries ministers moving between the two countries, plus defence and security officials. A relationship carried by working ministers is more durable than one carried by summits, because it does not require a leader's calendar to continue.",
    "The second is that the heaviest instruments cluster in the second half. The investment agreement in September, the defence memorandum in November, the trade terms of reference in November, the work plan in December. Whatever was being prepared in the earlier ministerial visits appears to have landed in the autumn.",
    "The third is the telephone record. Four calls between heads of government in nine months, on condolences, on the Iran conflict, on the Gaza peace plan, on the regional situation, plus New Year greetings in January. Two of those five are ceremonial and three are situational. A relationship in which heads of government reach each other about regional events, rather than only at summits, is operating at a different level from one that does not.",
    "One caution against over reading. This is a single year in a document maintained by one of the two governments, and a brief records what a ministry chose to record. Comparable density in earlier years might exist and not be listed. What can be said is that the record as published shows 2025 as the busiest year it describes, and that the instruments signed in it are among the heaviest."
  ]
},
{
  id: "two-scripts",
  title: "Two scripts, opposite solutions",
  category: "explainer",
  kind: "Explainer",
  standfirst: "Hebrew leaves the vowels out. Devanagari builds them in. Neither is harder. Understanding why they differ takes about ten minutes and changes how both look.",
  sources: [],
  status: "verified",
  body: [
    "Most people meeting Hebrew or Devanagari for the first time decide within a minute that it is difficult. That reaction is about unfamiliarity, not difficulty. Both systems are internally regular, and both solve the same problem in ways that are almost mirror images of each other. Seeing the logic is most of the work.",
    "The problem both are solving is this: speech is a continuous stream of sound, and writing has to cut it into pieces that can be drawn. Which pieces you choose determines everything else about the system.",
    "Hebrew cuts at the consonant. The twenty-two letters are consonants, and vowels are normally not written at all. A reader supplies them from context, from knowing the word, and from grammatical pattern. This is called an abjad, and it works because Semitic languages are built on consonantal roots: a three consonant root carries the core meaning, and the vowels poured into it inflect that meaning. Writing the consonants writes the meaning, and the vowels are pronunciation detail a competent reader already knows.",
    "There is a vowel notation, called niqqud, a system of dots and dashes above and below the letters. It exists, and it is used mainly in prayer books, poetry, dictionaries, and material for children and learners. In ordinary Hebrew text it is absent. A learner therefore faces a script that gives them less information than a fluent reader needs, which is why Hebrew feels hard early and gets easier suddenly.",
    "Devanagari cuts at the syllable. Each consonant letter carries a built in vowel, the short a, so the letter is not k but ka. To write a different vowel you attach a mark to the consonant. To write the consonant with no vowel at all you attach a different mark to suppress it. This is called an abugida, or an alphasyllabary, and the unit on the page corresponds to a syllable rather than to a single sound.",
    "The consequence is the opposite of Hebrew's. Devanagari text is fully vocalised as a matter of course. Nothing is left to context, because the vowels are structurally part of every letter you write. A learner can pronounce a Devanagari word correctly long before understanding it, which is the reverse of the Hebrew situation.",
    "Two details in Devanagari repay attention because they are where the system becomes elegant rather than merely consistent.",
    "The first is the order of the consonants. It is not arbitrary and it is not alphabetical in the European sense. It is a map of the mouth. The first row is made at the back of the throat, the next at the palate, the next with the tongue curled back, the next at the teeth, the last at the lips. Within each row the sounds move from unvoiced to aspirated to voiced to nasal. Once seen, the grid stops being a list to memorise and becomes a diagram of speech production, worked out by grammarians long before phonetics existed as a field.",
    "The second is the head line, the shirorekha, that runs across the top and joins the letters of a word into one connected strip. It is not decoration. It is what makes a Devanagari word a visual unit, and it is the reason Devanagari text has a distinctive horizontal grain that Hebrew, which sits on the line in separate blocks, does not.",
    "One shared feature is worth noting because it surprises people: neither script has capital and small letters. That distinction is a European development and not a requirement of writing.",
    "And one shared piece of history. Both traditions used letters as numbers. Every Hebrew letter has a numeric value, from alef as one to tav as four hundred, and reading words as numbers is called gematria. Sanskrit mathematics and astronomy used the katapayadi system, which encoded numbers as letters so that formulae could be memorised as verse. Two entirely independent traditions arriving at the same idea, that a writing system can carry arithmetic, is a better example of parallel invention than most of the comparisons usually offered between these two cultures.",
    "This piece explains structure, not usage. It is an explainer, and it makes no claim about the history of either script or about their relationship to each other. There is none: Hebrew and Devanagari are unrelated systems from unrelated families, and the comparison here is a teaching device, not a lineage."
  ]
},
{
  id: "small-project-method",
  title: "What a project with no budget can actually do",
  category: "method",
  kind: "Argument",
  standfirst: "Not compete with institutions. Do the specific work institutions are structurally bad at, which is more than it sounds.",
  sources: ["syn360-search", "wjc-india"],
  status: "verified",
  body: [
    "The honest starting point for a project like this one is that it cannot do most of what a research institute does. No archive access, no fieldwork budget, no language staff, no peer review, no ability to commission. Pretending otherwise produces a site that looks like an institute and contains a summary of Wikipedia.",
    "The useful question is the narrower one: what is a small, careful, open project structurally good at that a large institution is structurally bad at?",
    "The first thing is the boring dataset nobody is funded to build. There is no clean, sourced, machine readable directory of Jewish sites in India. Not because it is difficult, but because it is not a paper, not a grant deliverable, and not anyone's job. A list of buildings with dates, coordinates, conditions and citations is exactly the kind of artefact that requires patience rather than resources, and exactly the kind that everyone else then uses.",
    "The second is showing the disagreements. Institutions have reasons to present a settled figure. A project with no stakeholders can put two contradictory government figures side by side and say plainly that it does not know which is right. That is genuinely more useful to a researcher than a confident number, and it is easier to do when nobody is depending on the number.",
    "The third is publishing the gaps. Most writing on this subject describes what is known. Very little of it describes, in a form you could act on, what is missing. This site lists open questions, marks entries with no recorded date as having no recorded date, and keeps a wanted list on the directory and the comparison pages. A researcher looking for a topic can read those lists as a menu. That has value and costs nothing to produce.",
    "The fourth is speed of correction. An institution corrects on an editorial cycle. A static site with a public flag control and a published corrections log can correct in an afternoon and show its working. Being wrong faster and more visibly is a real advantage, and it is only available to a project willing to look wrong in public.",
    "The fifth is that everything can be given away. The data on this site is open, in plain files, in formats anyone can take. A project that produces reusable material becomes infrastructure for other people's work, which is a far more durable form of relevance than being read.",
    "What follows from this is a discipline about what not to do. Not another general history, because good ones exist. Not another news summary, because the wire services do it better. Not opinion pieces about where the relationship should go, because there is an enormous supply of those and no shortage of people better placed to write them.",
    "What is left is unglamorous and defensible: catalogue the buildings, date the events, cite everything, show the contradictions, name the gaps, publish the corrections, and give the data away.",
    "None of that requires a budget. All of it requires the same thing repeated: check the source, record the date, admit the gap."
  ]
}
];

A.articles.push(...NEW);
fs.writeFileSync(f, JSON.stringify(A, null, 2));
const w = A.articles.reduce((n, a) => n + a.body.join(" ").split(/\s+/).filter(Boolean).length, 0);
console.log(`${A.articles.length} articles, ${w} words in the library`);
