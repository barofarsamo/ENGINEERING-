
import type { Discipline, Lesson } from '../types';
import { BuildingIcon } from '../components/Icons';
import { civilEngineeringLabs } from './civil/labs';

const createCivilLesson = (id: string, title: string, content: any, labId?: string): Lesson => ({
    id: `civil-${id}`,
    title,
    imageUrl: `https://picsum.photos/800/400?random=${id}`,
    labId: labId,
    structuredContent: {
        whatIsIt: { title: 'Waa Maxay?', content: content.whatIsIt || 'Qeexitaan guud oo ku saabsan mawduucan.' },
        whyIsItImportant: { title: 'Maxay Muhiim u Tahay?', content: content.whyIsItImportant || 'Sharaxaad ku saabsan muhiimadda mawduucan.' },
        mainParts: { title: 'Qaybaha Ugu Waaweyn', content: content.mainParts || 'Faahfaahin ku saabsan qaybaha uu ka kooban yahay.' },
        howItWorks: { title: 'Sidee Buu u Shaqeeyaa?', content: content.howItWorks || 'Habka uu u shaqeeyo ama loo fuliyo.' },
        prerequisites: { title: 'Maxaa Loo Baahan Yahay si Loo Fahmo?', content: content.prerequisites || 'Aqoonta aasaasiga ah ee loo baahan yahay.' },
        examples: { title: 'Tusaalooyin Cad', content: content.examples || 'Tusaalooyin nolosha dhabta ah ka yimid.' },
        challenges: { title: 'Caqabadaha La Xiriira', content: content.challenges || 'Dhibaatooyinka ama caqabadaha la xiriira.' },
    },
    additionalContent: {
        history: content.history ? { title: 'Taariikhda / Asalka', content: content.history } : undefined,
        principles: content.principles ? { title: 'Fikrado / Mabaadii', content: content.principles } : undefined,
        skills: content.skills ? { title: 'Xirfado Lagu Dabaqi Karo', content: content.skills } : undefined,
        comparison: content.comparison ? { title: 'Isbarbardhig', content: content.comparison } : undefined,
    },
    quiz: content.quiz || [
        { question: `Waa maxay ${title}?`, options: ['Haa', 'Maya', 'Laga yaabee', 'Ma aqaan'], correctAnswer: 'Haa', explanation: 'Sharaxaad.' },
    ],
});


// --- SANADKA 1AAD ---

// Qaybta 1aad: Calculus I
const calculus_functions_limits = [
    createCivilLesson('calculus-functions-basics', 'CASHAR 1: Aasaaska Functions', {
        whatIsIt: "Function waa isku xirka u dhexeeya laba doorsoome (variables) halkaasoo qiimaha mid ka mid ah uu ku xiran yahay qiimaha kan kale. Midka hore waxaa loo yaqaan doorsoomaha madaxa-bannaan (Independent Variable), kan labaadna waa doorsoomaha ku-tiirsan (Dependent Variable).",
        whyIsItImportant: "Functions waa aasaaska luqadda aan kula hadalno qaab-dhismeedyada. Waxay noo oggolaanayaan inaan si xisaabeysan u moodeelayno xiriirka ka dhexeeya sababta iyo saameynta injineernimada. Marka aad naqshadeynayso dogob (beam), leexashadiisu (deflection) waa function ku xiran culeyska saaran iyo dhererkiisa.",
        examples: `Tusaale Dhismaha:\n\`Leexashada Dogobka = f(Culeyska, Dhererka)\`\nHalkee:\n- **Leexashada Dogobka** = Dependent Variable (waa natiijada)\n- **Culeyska & Dhererka** = Independent Variables (waa waxa aad beddeli karto)`,
        howItWorks: "Qaabka Function-ka ee fudud wuxuu noqon karaa: `f(x)= (W × L³) / (48 × E × I)` (Qaacidada leexashada dogobka dhexda laga saaray culeys).\n\n**Tusaale Xisaabeed:**\nKa soo qaad inaad leedahay dogob alwaax ah oo dhererkiisu yahay 4 mitir (L=4m) oo qaadaya culeys guud oo ah 2000 Newtons (W=2000N) bartamaha. Waxaan u baahanahay inaan xisaabino leexashada ugu badan.\n(Fiiro gaar ah: E iyo I waa qiimayaal la xiriira nooca walaxda iyo qaabka dogobka, laakiin hadda waxaan u qaadaneynaa in 48EI = 100,000 si aan u fududeyno).\n\n```\n1. Qaacidada: f(L) = (W × L³) / 100,000\n2. Geli Qiimayaasha: f(4) = (2000N × (4m)³) / 100,000\n3. Xisaabi: f(4) = (2000 × 64) / 100,000 = 128,000 / 100,000 = 1.28m\n```\n\n**Fasiraad:** Leexashada ugu badan ee dogobku waa 1.28 mitir. Tani waa qiimo aad u weyn oo muujinaya in dogobkani uusan ku habboonayn culeyskan, injineerkuna waa inuu beddelaa naqshadda.",
        prerequisites: "Fahamka aasaasiga ah ee aljebrada iyo doorsoomayaasha (variables).",
        quiz: [
            {
                question: "Function-ka `C(d) = 100/d` wuxuu matalayaa culeyska (C) uu qaadi karo dogob marka loo eego dhumucdiisa (d). Maxaa dhacaya marka dhumucda (d) la kordhiyo?",
                options: ["Culeysku wuu kordhayaa", "Culeysku wuu yaraanayaa", "Culeysku isma beddelayo", "Lama ogaan karo"],
                correctAnswer: "Culeysku wuu yaraanayaa",
                explanation: "Maadaama 'd' ay ku jirto hooseeyaha jajabka, kororka 'd' wuxuu keenaa in natiijada 'C' ay yaraato."
            },
            {
                question: "Haddii W=1000N, L=2m, iyo 48EI = 50,000, waa maxay leexashada (deflection) adigoo isticmaalaya qaacidada f(L)= (W × L³) / (48EI)?",
                options: ["0.16 m", "1.6 m", "0.08 m", "8 m"],
                correctAnswer: "0.16 m",
                explanation: "f(2) = (1000 * 2³) / 50000 = (1000 * 8) / 50000 = 8000 / 50000 = 0.16 m."
            }
        ]
    }),
    createCivilLesson('calculus-limits-intro', 'CASHAR 2: Xadka (Limits) - Qeexida iyo Tusaale', {
        whatIsIt: "Limit waa qiimaha uu shaqo (function) 'u dhowaanayo' marka doorsoomuhu (variable) uu u dhowaado qiimo gaar ah. Ma aha daruuri qiimaha shaqada ee dhibicdaas, laakiin waa meesha uu ku wajahan yahay.",
        whyIsItImportant: "Limits-ku wuxuu injineerka u sheegayaa 'barta burburka' ama 'xadka badbaadada'. Waxaan u isticmaalnaa inaan saadaalino waxa ku dhici doona qaab-dhismeedka marka uu gaaro xaaladaha ugu adag, xitaa daqiiqad ka hor inta uusan fashilmin.",
        examples: `Tusaale La Fududeeyay:\nHaddii dogob uu qaadi karo 10,000kg oo culeys ah, limit-kiisu waa 10,000kg. Tani waxay ka dhigan tahay:\n- Marka culeysku = 9,999kg → dogobku wuu yara leexanayaa, laakiin waa badqabaa.\n- Marka culeysku uu *u dhowaado* 10,000kg → dogobku aad ayuu u leexanayaa, wuxuu ku dhowdahay inuu jabto.\n- Marka culeysku uu *gaaro* 10,000kg → dogobku waa jabayaa.\nLimit-ku waa 10,000kg – culeyska ugu badan ee ay *u dhowaan* karto iyadoon jabin.`,
        howItWorks: `**Qaabka Xisaabinta:**\n\`lim f(x) = L\` marka \`x→c\`\nTani waxaa loo aqriyaa: "Limit-ka f(x) marka x uu u dhowaado c waa L".\n\n**Tusaale Xisaabeed Fudud:**\nHaddii \`f(x) = 2x + 1\`, waa maxay limit-ka marka x uu u dhowaado 3?\n\`lim (2x + 1)\` marka \`x→3\`\nMaadaama shaqadani ay tahay mid toosan oo aan lahayn meel ay ku go'do, waxaan si toos ah u gelin karnaa qiimaha:\n\`2(3) + 1 = 6 + 1 = 7\`\nMarka x uu u dhowaado 3, qiimaha shaqadu wuxuu u dhowaanayaa 7.`,
        prerequisites: "Fahamka fikradda functions-ka.",
        quiz: [
            {
                question: "Maxay la macno tahay 'limit' marka laga hadlayo injineernimada dhismaha?",
                options: ["Celceliska culeyska", "Qiimaha ugu yar ee uu qaadi karo", "Qiimaha ugu badan ee uu qaab-dhismeedku u dhowaan karo ka hor inta uusan burburin", "Bilowga culeyska"],
                correctAnswer: "Qiimaha ugu badan ee uu qaab-dhismeedku u dhowaan karo ka hor inta uusan burburin",
                explanation: "Limit-ku wuxuu qeexayaa xadka ama barta ugu dambaysa ee badbaadada ka hor inta uusan fashilku dhicin."
            },
            {
                question: "Haddii limit-ka xoogga dabaysha ee buundo uu yahay 200 km/h, maxaa la filan karaa haddii dabayshu gaarto 199 km/h?",
                options: ["Buundadu way dumi doontaa", "Buundadu waxba ma noqon doonto", "Buundadu waxay la kulmi doontaa gariir xooggan laakiin ma dumi doonto", "Dabayshu way istaagi doontaa"],
                correctAnswer: "Buundadu waxay la kulmi doontaa gariir xooggan laakiin ma dumi doonto",
                explanation: "Marka la u dhowaado limit-ka, qaab-dhismeedku wuxuu la kulmaa cadaadis daran, laakiin fashilku wuxuu dhacaa marka la gaaro ama la dhaafo limit-ka."
            }
        ]
    }),
    createCivilLesson('calculus-trig-functions', 'CASHAR 3: Shaqooyinka Trigonometric ee Dhismaha', {
        whatIsIt: `Shaqooyinka aasaasiga ah ee trigonometric (Sine, Cosine, Tangent) waxay qeexaan xiriirka ka dhexeeya xaglaha iyo dhinacyada saddex-xagalka qumman.\n- **sin(θ)** = Dhinaca Ka Soo Horjeeda / Hypotenuse\n- **cos(θ)** = Dhinaca Ku Dhow / Hypotenuse\n- **tan(θ)** = Dhinaca Ka Soo Horjeeda / Dhinaca Ku Dhow`,
        whyIsItImportant: "Injineernimada madaniga, wax kasta oo leh xagal ama jiirad—sida saqafyada, buundooyinka, jaranjarooyinka, iyo xoogagga ku dhacaya xagal—waxaa lagu falanqeeyaa iyadoo la isticmaalayo trigonometry.",
        examples: `Tusaale La Fududeeyay: Saqaf leh xagal 30° oo salkiisu yahay 10m.\n- Si loo helo dhererka jiirada saqafka (birta), waxaan isticmaalnaa Cosine.\n- Si loo helo joogga saqafka, waxaan isticmaalnaa Tangent.`,
        howItWorks: `**Tusaale Xisaabeed: Naqshadaynta Jiirada Saqafka**\nKa soo qaad inaad naqshadaynayso saqaf salkiisu yahay 10 mitir (L=10m) oo leh jiirad xagal ah 30° (θ=30°). Waxaad u baahan tahay inaad ogaato dhererka birta jiirada iyo joogga saqafka.\n\n**1. Helitaanka Dhererka Birta Jiirada (Hypotenuse):**\n- **Qaacidada:** \`cos(θ) = Sal (Adjacent) / Hypotenuse\` → \`Hypotenuse = Sal / cos(θ)\`\n- **Geli Qiimayaasha:** \`Hypotenuse = 10m / cos(30°)\`\n- **Xisaabi:** Maadaama \`cos(30°) ≈ 0.866\`, \`Hypotenuse = 10 / 0.866 ≈ 11.55m\`\n\n**2. Helitaanka Joogga Saqafka (Opposite):**\n- **Qaacidada:** \`tan(θ) = Joog (Opposite) / Sal (Adjacent)\` → \`Joog = Sal × tan(θ)\`\n- **Geli Qiimayaasha:** \`Joog = 10m × tan(30°)\`\n- **Xisaabi:** Maadaama \`tan(30°) ≈ 0.577\`, \`Joog = 10 × 0.577 ≈ 5.77m\`\n\n**Fasiraad:** Waxaad u baahan tahay biro dhererkoodu yahay 11.55m, saqafkuna wuxuu kor u kici doonaa 5.77m bartamaha.`,
        prerequisites: "Aqoonta aasaasiga ah ee joometeriga iyo saddex-xagallada.",
        quiz: [
            {
                question: "Haddii aad rabto inaad hesho joogga tiirka korontada adigoo og masaafada aad u jirto iyo xagasha aad kor ugu eegayso, keebaa isticmaalaysaa?",
                options: ["Sine", "Cosine", "Tangent", "Midna"],
                correctAnswer: "Tangent",
                explanation: "Tangent waxay isku xirtaa xagasha, dhinaca ka soo horjeeda (joogga), iyo dhinaca ku dhow (masaafada aad u jirto)."
            },
            {
                question: "Jaranjaro dhererkeedu yahay 15m ayaa derbi ku tiirsan, waxayna dhulka la samaynaysaa xagal 60°. Immisa ayay derbiga kor uga taal?",
                options: ["7.5 m", "10.6 m", "13 m", "15 m"],
                correctAnswer: "13 m",
                explanation: "Waxaan rabnaa dhinaca ka soo horjeeda (joogga). Waxaan haysannaa hypotenuse. Marka waxaan isticmaaleynaa sin(60°) = Joogga / 15. Joogga = 15 * sin(60°) ≈ 13m."
            }
        ]
    }),
    createCivilLesson('calculus-continuity', 'CASHAR 4: Continuity - Socodka si Joogto ah', {
        whatIsIt: "Funkshan waa 'joogto' (continuous) haddii garaafkiisa la sawiri karo iyada oo aan qalinka la qaadin. Si farsamo ahaan, macnaheedu waa isbeddel yar oo ku yimaada input-ka wuxuu keenaa isbeddel yar oo la saadaalin karo oo ku yimaada output-ka, iyada oo aan jirin boodbood ama daloolo.",
        whyIsItImportant: "Dhismayaasha iyo kaabayaasha waa inay noqdaan kuwo joogto ah. Jajab ama meel aan isku xirnayn (discontinuity) oo ku timaada dogob, buundo, ama waddo waxay matalaysaa dildilaac, daciifnimo, ama barta burburka. Falanqaynta qaab-dhismeedku waxay ku tiirsan tahay malo-awaalka ah in walxuhu ay yiin kuwo joogto ah.",
        mainParts: `Shuruudaha Continuity ee dhibicda 'a':\n1.  **f(a) waa inuu jiraa:** Shaqadu waa inay qeexan tahay meeshaas.\n2.  **lim f(x) marka x→a waa inuu jiraa:** Limit-ku waa inuu ka jiraa labada dhinacba.\n3.  **f(a) = lim f(x) marka x→a:** Qiimaha shaqada iyo limit-ku waa inay is le'ekaadaan.`,
        examples: `**Tusaale Injineernimo:**\n- **Continuous:** Dogob bir ah oo isku dhan. Marka culeys la saaro, leexashadiisu waa mid siman oo la saadaalin karo.\n- **Discontinuous:** Laba dogob oo si liidata la isugu alxamay. Barta alxanka waa 'discontinuity' awoodda ah. Marka culeys la saaro, bartaas way jabi kartaa si lama filaan ah.\n\n**Tusaale Xisaabeed:** Shaqada \`f(x) = 5/x\` waxay leedahay 'discontinuity' meesha x=0. Sababtoo ah ma jiro qiimo la qeexi karo marka eber wax loo qaybiyo. Tani waxay u dhigantaa god lama filaan ah oo ku yaal waddada oo aan la sii wadi karin.`,
        prerequisites: "Fahamka Limits-ka.",
        quiz: [
            {
                question: "Muxuu 'discontinuity' ku matali karaa qaab-dhismeedka buundo?",
                options: ["Midabka buundada", "Dhererka buundada", "Dildilaac ama meel jaban oo halis ah", "Tirada baabuurta"],
                correctAnswer: "Dildilaac ama meel jaban oo halis ah",
                explanation: "Discontinuity waxay ka dhigan tahay in qaab-dhismeedku uusan isku xirnayn si sax ah, taasoo ah cillad weyn oo qaab-dhismeedka."
            },
            {
                question: "Keebaa ka mid ah shaqooyinkan soo socda leh 'discontinuity' meesha x=0?",
                options: ["f(x) = x + 5", "f(x) = x²", "f(x) = 5/x", "f(x) = cos(x)"],
                correctAnswer: "f(x) = 5/x",
                explanation: "Shaqada f(x) = 5/x lama qeexi karo marka x=0 (isku qeybinta eber), taasoo abuuraysa discontinuity."
            }
        ]
    }),
    createCivilLesson('calculus-limits-applications', 'CASHAR 5: Isticmaalka Xadka Dhibaatooyinka Dhabta ah', {
        whatIsIt: "Casharkani wuxuu isku darayaa fahamkeena limits-ka si aan u xallino dhibaatooyin la taaban karo oo injineernimo. Waxaan arki doonaa sida loo isticmaalo aljebrada si loo qiimeeyo limits-ka marka ay u muuqdaan kuwo aan la qeexin marka hore (qaabka 0/0).",
        prerequisites: "Faham adag oo ku saabsan aljebrada, gaar ahaan kala-bixinta (factoring).",
        howItWorks: `**Masaal: Falanqaynta Barta Daciifka ah ee Dogob**\nLeexashada dogob meel u dhow tiirka waxaa lagu matali karaa \`f(x) = (x² - 4) / (x - 2)\`. Meesha x=2 waa meel muhiim ah (tiirka laftiisa), laakiin haddii aan gelinno 2, waxaan helaynaa 0/0. Waxaan isticmaaleynaa aljebrada si aan u helno limit-ka leexashada marka loo dhowaado tiirka.\n\n**Xallinta:**\n1. **Falanqee Qaacidada:** Waxaan aragnaa in \`x² - 4\` la kala bixin karo (waa 'difference of squares').\n2. **Kala Bixi:** \`x² - 4\` waxay noqonaysaa \`(x-2)(x+2)\`.\n3. **Fududee:** \`lim [(x-2)(x+2) / (x-2)]\` marka \`x→2\`\n4. **Iska Jar:** Waxaan iska jareynaa \`(x-2)\` qeybta sare iyo hoose: \`lim (x+2)\` marka \`x→2\`\n5. **Xisaabi Limit-ka:** Hadda waxaan si toos ah u gelin karnaa 2:\n   \`2 + 2 = 4\`.\n\n**Fasiraad:** Inkastoo qaacidada aysan si toos ah u shaqeyneynin meesha x=2, waxaan ognahay in leexashadu ay u dhowaanayso 4 cutub marka la gaaro bartaas. Aqoontani waxay muhiim u tahay falanqaynta badbaadada isku xirka.`,
        quiz: [
            {
                question: "Waa maxay limit-ka f(x) = (x² - 9) / (x - 3) marka x uu u dhowaado 3?",
                options: ["0", "3", "6", "9"],
                correctAnswer: "6",
                explanation: "Kala bixi (x² - 9) oo noqo (x-3)(x+3). Iska jar (x-3). Waxaa haraya (x+3). Geli 3, natiijadu waa 3+3=6."
            },
            {
                question: "Maxay muhiim u tahay in la xalliyo limit-ka '0/0' halkii la dhihi lahaa 'lama qeexin'?",
                options: ["Ma ahan muhiim", "Si loo helo dabeecadda saxda ah ee qaab-dhismeedka ee barta muhiimka ah", "Si loo fududeeyo xisaabta", "Si loo jahawareeriyo injineerada"],
                correctAnswer: "Si loo helo dabeecadda saxda ah ee qaab-dhismeedka ee barta muhiimka ah",
                explanation: "Inkastoo qiimaha saxda ah ee bartaas aan la qeexin, limit-ku wuxuu noo sheegayaa qiimaha ay u dhowaanayso, taasoo muhiim u ah falanqaynta badbaadada."
            }
        ]
    })
];

const calculus_derivatives = [
    createCivilLesson('derivative-definition-basics', 'CASHAR 1: Qeexida Derivative iyo Aasaasiga', {
        whatIsIt: "Derivative waa isbeddelka degdegga ah (instantaneous rate of change) ee shaqo marka doorsoomuhu isbeddelo. Si fudud, waa xawaaraha isbeddelka ee hal dhibic oo gaar ah. Joomatari ahaan, waa jiirada (slope) xariiqda taabata qalooca meeshaas.",
        whyIsItImportant: "Derivatives waxay injineerka u sheegaan sida ay wax isu beddelayaan. Tani waxay muhiim u tahay in la helo meelaha ugu sarreeya (maximum) iyo kuwa ugu hooseeya (minimum) ee qaab-dhismeedka, sida leexashada ugu badan ee dogob ama cadaadiska ugu sarreeya.",
        howItWorks: `**Tusaale Xisaabeed: Helitaanka Leexashada Ugu Yar**\nLeexashada dogob waxaa lagu matali karaa shaqadan: \`f(x) = x² - 4x + 6\`, halka 'x' ay tahay masaafada. Waxaan rabnaa inaan helno meesha leexashadu ugu yar tahay (barta ugu hooseysa).\n\n1. **Soo Hel Derivative-ka:** Adigoo isticmaalaya Power Rule, derivative-ka shaqadani waa: \`f'(x) = 2x - 4\`.\n2. **La Sim Eber:** Si loo helo barta taagan (meesha jiiradu eber tahay), waxaan la simaynaa derivative-ka eber: \`2x - 4 = 0\`.\n3. **Xalli:** \`2x = 4\` → \`x = 2\`.\n\n**Fasiraad:** Meesha leexashadu ugu yar tahay (ama ugu badan tahay kiis kale) waa meesha masaafadu tahay 2 mitir. Tani waa barta ugu muhiimsan ee la falanqeeyo si loo hubiyo adkeysiga dogobka.`,
        examples: `Tusaale kale, haddii shaqadu matalayso cadaadiska saaran aasaaska dhismaha, derivative-ka wuxuu naga caawinayaa inaan helno meesha cadaadisku ugu badan yahay, si aan meeshaas u xoojino.`,
        quiz: [
            {
                question: "Maxay derivative-ku u matalaysaa garaafka shaqo?",
                options: ["Bedka garaafka hoostiisa", "Jiirada xariiqda taabata", "Dhererka garaafka", "Qiimaha ugu weyn"],
                correctAnswer: "Jiirada xariiqda taabata",
                explanation: "Derivative-ku wuxuu bixiyaa jiirada (slope) ee qalooca meel kasta oo la siiyo."
            },
            {
                question: "Haddii derivative-ka shaqo uu yahay eber meel gaar ah, maxay taasi ka dhigan tahay?",
                options: ["Shaqadu way sii kordhaysaa", "Shaqadu waxay gaartay meel taagan (maximum, minimum, ama barta leexashada)", "Shaqadu way sii yaraanaysaa", "Shaqadu waa eber"],
                correctAnswer: "Shaqadu waxay gaartay meel taagan (maximum, minimum, ama barta leexashada)",
                explanation: "Marka jiiradu eber tahay, garaafku waa siman yahay, taasoo muujinaysa barta ugu sarreysa, tan ugu hooseysa, ama meel kale oo muhiim ah."
            }
        ]
    }),
    createCivilLesson('differentiation-rules-basics', 'CASHAR 2: Qawaaniinta Differentiation', {
        whatIsIt: `Qawaaniinta Differentiation-ka waa xeerar la soo gaabiyey oo loo isticmaalo in lagu helo derivatives si fudud. Kuwa ugu muhiimsan waa:
1.  **Power Rule:** \`d/dx(xⁿ) = nxⁿ⁻¹\`
2.  **Product Rule:** \`d/dx(uv) = u'v + uv'\`
3.  **Chain Rule:** \`d/dx[f(g(x))] = f'(g(x)) × g'(x)\``,
        whyIsItImportant: "Qawaaniintan waxay noo suurtagelinayaan inaan si degdeg ah u xallino qaacidooyin injineernimo oo adag. Tusaale ahaan, marka la xisaabinayo sida cadaadisku ugu faafo birta, qaacidada waxay noqon kartaa mid isku dhafan, waxaana loo baahan yahay Chain Rule si loo helo isbeddelkeeda.",
        howItWorks: `**Tusaale Xisaabeed: Isticmaalka Chain Rule**\nKa soo qaad in cadaadiska (stress) ku jira fiilada buundada lagu matalo shaqadan: \`S(t) = (5t² + 3)³\` halka 't' ay tahay heerkulka. Waxaan rabnaa inaan ogaanno heerka isbeddelka cadaadiska marka loo eego heerkulka (S'(t)).\n\n1. **Aqoonso Shaqooyinka:** Shaqada dibadda waa \`f(u) = u³\`. Shaqada gudaha waa \`g(t) = 5t² + 3\`.\n2. **Soo Hel Derivatives-kooda:** \`f'(u) = 3u²\`. \`g'(t) = 10t\`.\n3. **Ku Dabaq Chain Rule:** \`S'(t) = f'(g(t)) × g'(t)\`\n   \`S'(t) = 3(5t² + 3)² × (10t)\`\n   \`S'(t) = 30t(5t² + 3)²\`\n\n**Fasiraad:** Qaacidadan \`S'(t)\` waxay noo sheegaysaa sida degdegga ah ee cadaadisku isugu beddelayo heerkul kasta. Haddii aan rabno inaan ogaanno heerka isbeddelka marka heerkulku yahay 2°C, waxaan gelinaynaa t=2.`,
        quiz: [
            {
                question: "Isticmaal Power Rule, waa maxay derivative-ka f(x) = x⁵?",
                options: ["5x", "x⁴", "5x⁴", "x⁵"],
                correctAnswer: "5x⁴",
                explanation: "Sida ku cad Power Rule, n=5, markaa derivative-ku waa nxⁿ⁻¹ = 5x⁵⁻¹ = 5x⁴."
            },
            {
                question: "Goorma ayaa la isticmaalaa Chain Rule?",
                options: ["Marka laba shaqo la isku darayo", "Marka shaqo ay ku dhex jirto shaqo kale (composite function)", "Marka shaqo loo qeybiyo mid kale", "Mar kasta"],
                correctAnswer: "Marka shaqo ay ku dhex jirto shaqo kale (composite function)",
                explanation: "Chain Rule waxaa si gaar ah loogu talagalay in lagu helo derivative-ka shaqooyinka isku-dhafan sida sin(2x) ama (x²+1)³."
            }
        ]
    }),
    createCivilLesson('optimization-basics', 'CASHAR 3: Optimization - Helitaanka Qiimaha ugu Fiican', {
        whatIsIt: "Optimization waa habka loo isticmaalo derivatives si loo helo qiimaha ugu sarreeya (maximum) ama kan ugu hooseeya (minimum) ee shaqo. Tani waxay fure u tahay naqshadaha ugu hufan ee injineernimada.",
        whyIsItImportant: "Injineer ahaan, hadafkaagu waa inaad hesho naqshadda ugu fiican — tan ugu jaban, tan ugu adag, ama tan ugu weyn. Tusaale ahaan, inaad dhisto kanaal biyo oo leh qaabka ugu fiican si uu u qaado biyaha ugu badan iyadoo la isticmaalayo qadar go'an oo shamiito ah.",
        howItWorks: `**Tusaale Xisaabeed: Naqshadaynta Kanaalka Biyaha ee Ugu Fiican**\nWaxaan rabnaa inaan dhisno kanaal biyo oo leydi ah oo furan oo wareeggiisu (perimeter) yahay 10m. Waxaan rabnaa inaan helno cabbirrada (ballaca 'x' iyo joogga 'y') si uu u qaado bedka ugu weyn (maximum cross-sectional area).\n\n1.  **Bedka (Area - Shaqada la weyneynayo):** \`A = x × y\`\n2.  **Wareegga (Perimeter - Xaddidaadda):** Kanaalku waa furan yahay, markaa \`x + 2y = 10\`. Ka soo saar y: \`y = (10 - x) / 2 = 5 - 0.5x\`\n3.  **Samee Hal Shaqo:** Ku beddel y shaqada bedka: \`A(x) = x(5 - 0.5x) = 5x - 0.5x²\`\n4.  **Soo Hel Derivative-ka:** \`A'(x) = 5 - x\`\n5.  **La Sim Eber:** Si aad u hesho barta muhiimka ah: \`5 - x = 0\` → \`x = 5m\`\n6.  **Soo Hel y:** \`y = 5 - 0.5(5) = 5 - 2.5 = 2.5m\`\n\n**Fasiraad:** Si loo helo bedka ugu weyn, ballaca kanaalku waa inuu ahaadaa 5m, jooggiisuna 2.5m. Cabbirradan ayaa hubinaya in kanaalku qaado biyaha ugu badan ee suurtogalka ah.`,
        quiz: [
            {
                question: "Maxay tahay tillaabada ugu horreysa ee lagu xalliyo dhibaatada optimization-ka?",
                options: ["In la helo derivative-ka labaad", "In la sawiro garaafka", "In la qoro shaqada la rabo in la weyneeyo/yareeyo iyo xiriirka xaddidaya", "In la qiyaaso jawaabta"],
                correctAnswer: "In la qoro shaqada la rabo in la weyneeyo/yareeyo iyo xiriirka xaddidaya",
                explanation: "Kahor intaadan isticmaalin calculus, waa inaad si xisaabeysan u qeexdaa dhibaatada adigoo samaynaya isle'egyada ku habboon."
            }
        ]
    }),
    createCivilLesson('related-rates-basics', 'CASHAR 4: Related Rates - Isbeddelka la Xidhiidha', {
        whatIsIt: "Related Rates waa dhibaatooyin ku lug leh helitaanka heerka isbeddelka hal doorsoome iyadoo la og yahay heerka isbeddelka doorsoome kale oo la xiriira. Waxaan isticmaalnaa differentiation si aan u helno xiriirka ka dhexeeya heerarkooda isbeddel.",
        whyIsItImportant: "Dhismaha, waxyaabo badan ayaa isku mar isbeddela. Marka la shubayo biyo taangi, mugga biyuhu wuu kordhayaa, dhererka biyuhuna sidoo kale wuu kordhayaa. Related rates waxay noo oggolaanayaan inaan xisaabino sida degdegga ah ee dhererku u kordhayo marka la ogyahay sida degdegga ah ee biyaha loo shubayo.",
        howItWorks: `**Tusaale Xisaabeed: Buuxinta Taangiga Biyaha**\nTaangi cilindir ah, gacan-kiisu (radius) yahay 2m, ayaa biyo lagu shubayaa heerka 10 m³/s. Sidee degdeg ah ayuu dhererka (h) biyuhu u kordhayaa?\n\n1.  **Qaacidada Guud:** Mugga cilindirka waa \`V = πr²h\`. Maadaama r uu yahay mid go'an (r=2m), qaacidada waa \`V = 4πh\`.\n2.  **Differentiation marka loo eego Waqtiga (t):** Ka qaad derivative-ka labada dhinac: \`dV/dt = 4π(dh/dt)\`.\n3.  **Geli Qiimayaasha La Yaqaan:** Waxaan naqaannaa in biyaha lagu shubayo \`dV/dt = 10 m³/s\`. Marka \`10 = 4π(dh/dt)\`.\n4.  **Xalli si aad u Hesho dh/dt:** \`dh/dt = 10 / (4π) ≈ 0.796 m/s\`.\n\n**Fasiraad:** Dhererka biyuhu wuxuu ku kordhayaa qiyaastii 0.8 mitir ilbiriqsikiiba. Aqoontani waxay muhiim u tahay naqshadaynta nidaamyada buuxinta iyo faaruqinta taangiyada si looga fogaado inay buux-dhaafaan.`,
        quiz: [
            {
                question: "Haddii dhererka iyo ballaca leydi ay ku korayaan heerarka 2 cm/s iyo 3 cm/s siday u kala horreeyaan, sidee degdeg ah ayuu bedku u korayaa marka dhererku yahay 10cm ballacuna yahay 6cm?",
                options: ["5 cm²/s", "38 cm²/s", "60 cm²/s", "12 cm²/s"],
                correctAnswer: "38 cm²/s",
                explanation: "A = l*w. dA/dt = (dl/dt)w + l(dw/dt). dA/dt = (2)(6) + (10)(3) = 12 + 30 = 38 cm²/s."
            }
        ]
    }),
    createCivilLesson('derivative-applications-construction', 'CASHAR 5: Isticmaalka Derivatives-ka ee Dhismaha', {
        whatIsIt: "Casharkani wuxuu soo koobayaa sida fikradaha derivatives-ka loogu dabaqo dhibaatooyinka dhabta ah ee injineernimada madaniga, sida xisaabinta xoogagga, dheemanista (deflection), iyo jiirada waddooyinka.",
        whyIsItImportant: "Derivatives waxay bixiyaan hab sax ah oo lagu falanqeeyo sida qaab-dhismeedyadu uga falceliyaan culeysyada iyo sida loo naqshadeeyo kaabayaasha sida waddooyinka si ay u noqdaan kuwo badbaado leh oo waxtar leh.",
        howItWorks: `**Tusaale Xisaabeed: Qorsheynta Jiirada Waddo**\nQaabka dhererka waddo waxaa lagu matali karaa: \`h(x) = 0.01x² - 0.2x + 5\`, halka x ay tahay masaafada. Waxaan rabnaa inaan ogaanno jiirada waddada meesha masaafadu tahay 50m.\n\n1. **Soo Hel Shaqada Jiirada (Derivative):** Jiirada waddada meel kasta waxaa bixiya derivative-ka: \`h'(x) = 0.02x - 0.2\`.\n2. **Xisaabi Jiirada Meesha la Rabo (x=50):** Geli qiimaha x: \`h'(50) = 0.02(50) - 0.2 = 1 - 0.2 = 0.8\`.\n\n**Fasiraad:** Meesha masaafadu tahay 50m, jiirada waddadu waa 0.8, taasoo la micno ah 80% (tani waa jiirad aad u weyn oo tusaale ah). Aqoontani waxay muhiim u tahay naqshadaynta dheecaanka biyaha iyo badbaadada gaadiidka.`,
        quiz: [
            {
                question: "Haddii shaqada matalaysa dheemanista (deflection) dogob ay tahay d(x), maxay matalaysaa d'(x)?",
                options: ["Dhererka dogobka", "Culeyska saaran", "Jiirada (slope) ee dheemanista", "Midna"],
                correctAnswer: "Jiirada (slope) ee dheemanista",
                explanation: "Derivative-ka shaqada dheemanista wuxuu bixiyaa jiirada qalooca dheemanista, taasoo muujinaysa xagasha uu dogobku ku leexday."
            }
        ]
    })
];

const calculus_integration = [
    createCivilLesson('integration-basics', 'CASHAR 1: Aasaaska Integration iyo Qeexida', {
        whatIsIt: "Integration waa hab xisaabeed oo lagu uruuriyo isbeddelada yar-yar ee aan la koobi karin si loo helo wadarta guud. Haddii differentiation-ku yahay kala-saarid, integration-ku waa isku-keenid. Waa habka lagu helo 'anti-derivative' ee shaqo.",
        whyIsItImportant: "Wuxuu muhiim u yahay in la helo tirooyin sax ah oo la taaban karo. Marka aan naqaanno culeyska ku qaybsan dogob, integration-ku wuxuu na siinayaa culeyska guud ee ay tahay in tiirarku qaadaan. Waxay noo oggolaanaysaa inaan xisaabino bedka iyo mugga qaababka aan joogtada ahayn.",
        howItWorks: `**Qaacidada Guud:**
\`∫ f(x) dx = F(x) + C\`
- **∫**: Summada isku darka (Integration symbol)
- **f(x)**: Shaqada aad wadarta u rabto (tusaale, shaqada culeyska)
- **dx**: Isbeddelka aadka u yar ee 'x'
- **F(x)**: Shaqada asalka ah (Anti-derivative)
- **C**: Constant-ka Integration-ka (qiime joogto ah oo la iska indho tiro marka la xisaabinayo bedka/mugga xaddidan).

**Sida Loo Shaqeeyo:**
1.  Qeexi shaqada aad wadarta guud u raadinayso.
2.  Raadi shaqada asalka ah (anti-derivative) ee shaqadaas.
3.  Ku dar constant-ka 'C' haddii uu yahay integral aan xaddidnayn.`,
        examples: `**Tusaale Dhismaha:**
Marka aad dhisayso daaqad leh qaab qaloocan, ma iska darsan kartid culeyska guud ee daaqadda. Waa inaad isku dartaa culeyska saaran meel kasta oo yar oo daaqadda ka mid ah si aad u hesho culeyska guud. Integration-ku waa habka xisaabeed ee tan loo sameeyo.

**Tusaale Nololeed:**
Sida mayaqaanka shaqeeya uusan isugu darin mushaharka saddex bilood hal mar, laakiin uu u helo mushahar kasta goonidiisa, integration-ku wuxuu isku daraa qayb kasta oo yar si loo helo wadarta guud.`,
        quiz: [
            {
                question: "Integration-ku muxuu ka soo horjeedaa xisaab ahaan?",
                options: ["Isku-dhufasho", "Kala-qaybin", "Differentiation", "Isku-dar"],
                correctAnswer: "Differentiation",
                explanation: "Integration waa habka rogaal-celiska ah ee differentiation. Mid wuxuu isku-daraa, midna wuu kala-jajabiyaa isbeddelada."
            },
            {
                question: "Maxay 'C' ku matalaysaa qaacidada ∫ f(x) dx = F(x) + C?",
                options: ["Culeyska", "Constant-ka Integration-ka", "Qiimaha ugu sarreeya", "Bedka"],
                correctAnswer: "Constant-ka Integration-ka",
                explanation: "Wuxuu matalayaa qoys dhan oo shaqooyin ah oo leh derivative isku mid ah. Waa qiime joogto ah oo ku darsama natiijada."
            }
        ]
    }),
    createCivilLesson('integration-rules', 'CASHAR 2: Qawaaniinta Aasaasiga ah ee Integration', {
        whatIsIt: `Si loo fududeeyo habka integration-ka, waxaa jira qawaaniin aasaasi ah:
1.  **Power Rule:** \`∫xⁿ dx = (xⁿ⁺¹)/(n+1) + C\` (halkee n ≠ -1)
2.  **Constant Rule:** \`∫k dx = kx + C\` (halkee k yahay joogto)
3.  **Sum/Difference Rule:** \`∫[f(x) ± g(x)] dx = ∫f(x) dx ± ∫g(x) dx\``,
        whyIsItImportant: "Qawaaniintan waxay noo suurtagelinayaan inaan si degdeg ah u xallino qaacidooyin injineernimo oo adag, iyagoo u kala jajabinaya dhibaatooyinka waaweyn qaybo yaryar oo la maareyn karo, sida xisaabinta culeyska guud ee saaran dogob leh culeysyo kala duwan.",
        howItWorks: `**Tusaale Xisaabeed: Culeyska Guud ee Dogob**
Ka soo qaad in culeyska ku qaybsan dogob lagu matalo shaqadan: \`f(x) = 3x² + 2x + 5\` N/m.
Si loo helo qaacidada culeyska guud, waxaan integreynaynaa shaqadan:
\`Culeyska Guud = ∫(3x² + 2x + 5) dx\`

1.  **Kala Jar (Sum Rule):** \`= ∫3x² dx + ∫2x dx + ∫5 dx\`
2.  **Isticmaal Power & Constant Rules:** \`= 3(x³/3) + 2(x²/2) + 5x + C\`
3.  **Fududee:** \`= x³ + x² + 5x + C\`

Tani waa qaacidada guud ee culeyska.`,
        examples: `**Tusaale Dhismaha:**
Marka aad xisaabinayso birta la bixiyay tiir, waxaad u baahan tahay inaad isku dartaa dhammaan qaybaha tiirka. Sidaas oo kale, guriga aad dhisayso, ma isku darsan kartid dhammaan qalabka si kooban. Waa inaad isku dartaa birta, simenta, iyo miroka si gooni gooni ah, kadibna aad isku-darto wadartooda.`,
        quiz: [
            {
                question: "Isticmaal Power Rule, waa maxay ∫x⁴ dx?",
                options: ["4x³ + C", "x⁵ + C", "x⁵/5 + C", "5x⁵ + C"],
                correctAnswer: "x⁵/5 + C",
                explanation: "Sida ku cad Power Rule, n=4, markaa integral-ku waa xⁿ⁺¹/(n+1) = x⁵/5 + C."
            },
            {
                question: "Waa maxay ∫(6x + 7) dx?",
                options: ["6x² + 7x + C", "3x² + 7x + C", "6", "3x² + 7 + C"],
                correctAnswer: "3x² + 7x + C",
                explanation: "∫6x dx = 6(x²/2) = 3x². ∫7 dx = 7x. Marka la isku-daro, waa 3x² + 7x + C."
            }
        ]
    }),
    createCivilLesson('definite-integral', 'CASHAR 3: Definite Integral - Xisaabinta Wadarta Xaddidan', {
        whatIsIt: "Definite Integral waa integration leh xaddidaad (limits). Halkii laga heli lahaa qaacido guud, wuxuu na siinayaa jawaab tiro ah oo sax ah. Joomatari ahaan, wuxuu matalayaa bedka saafiga ah ee u dhexeeya qalooca shaqada iyo x-axis-ka inta u dhexeysa xadka hoose 'a' iyo kan sare 'b'.",
        whyIsItImportant: "Waxay muhiim u tahay in la helo jawaabo tiro ah oo sax ah oo loo isticmaali karo naqshadaynta dhabta ah, sida ogaanshaha wadarta culeyska saaran dogob dhererkiisu yahay 10m, ama tirada saxda ah ee agabka loo baahan yahay.",
        howItWorks: `**Qaacidada Xisaabta:**
\`∫ₐᵇ f(x) dx = [F(x)]ₐᵇ = F(b) - F(a)\`

**Tusaale Xisaabeed: Birta Loo Baahan Yahay Tiir**
Haddii birta loo baahan yahay halkii mitir ee tiir lagu matalo \`f(x) = 2x + 1\` (kg/m), imisa kg ayaa looga baahan yahay tiir dhererkiisu yahay 10m?
1.  **Samee Definite Integral:** \`∫₀¹⁰ (2x + 1) dx\`
2.  **Soo Hel Anti-derivative:** \`[x² + x]\`
3.  **Qiimee inta u dhaxaysa xadka (0 ilaa 10):** \`= [x² + x]₀¹⁰\`
4.  **Ka Jar (F(b) - F(a)):** \`= (10² + 10) - (0² + 0) = (100 + 10) - 0 = 110 kg\`

**Fasiraad:** Waxaa loo baahan yahay 110 kg oo bir ah tiirkan.`,
        examples: `Marka aad rabto inaad ogaato inta lacag ah aad ku bixineyso mushaharka 6 bilood, waxaad isticmaali doontaa definite integral si aad u hesho wadarta guud ee xaddidan.`,
        quiz: [
            {
                question: "Xisaabi ∫₁³ 3x² dx.",
                options: ["8", "26", "27", "1"],
                correctAnswer: "26",
                explanation: "Anti-derivative-ka waa x³. Marka la qiimeeyo: F(3) - F(1) = 3³ - 1³ = 27 - 1 = 26."
            },
            {
                question: "Maxay noqonaysaa natiijada definite integral?",
                options: ["Shaqo cusub + C", "Tiro sax ah", "Qiyaas", "Lama ogaan karo"],
                correctAnswer: "Tiro sax ah",
                explanation: "Definite integral wuxuu had iyo jeer bixiyaa qiime tiro ah oo matalaya wadarta guud, bedka, ama mugga inta u dhexeysa xadka la bixiyay."
            }
        ]
    }),
    createCivilLesson('integration-area-volume', 'CASHAR 4: Xisaabinta Bedka iyo Mugga ee Dhismaha', {
        whatIsIt: "Integration-ka waxaa si toos ah loogu dabaqaa xisaabinta bedka qaababka aan joogtada ahayn iyo mugga walxaha adag, kuwaasoo aan lagu xisaabin karin qaacidooyinka joomatari ee caadiga ah.",
        whyIsItImportant: `Injineernimada madaniga, tan waxaa loo isticmaalaa in lagu xisaabiyo:
- Mugga ciidda la qodayo ama la buuxinayo mashruuc waddo.
- Mugga shamiitada looga baahan yahay dhismo qaab adag leh sida biyo-xireen.
- Awoodda kaydinta biyaha ee taangi leh qaab aan joogto ahayn.`,
        howItWorks: `**Tusaale 1: Xisaabinta Bedka Daqaad**
Daqaad leh qaab qaloocan oo lagu matalay \`f(x) = x²\`. Waxaan rabnaa bedka u dhexeeya x=0 iyo x=5 mitir.
\`Bedka (Area) = ∫₀⁵ x² dx\`
\`= [x³/3]₀⁵ = (5³/3) - (0³/3) = 125/3 ≈ 41.67 m²\`

**Tusaale 2: Xisaabinta Mugga Weer**
Weer cilindir ah oo gacan-kiisu yahay 2m (r=2), dhererkiisuna 10m (h=10).
\`Mugga (Volume) = ∫₀¹⁰ (Bedka Goobada) dh = ∫₀¹⁰ πr² dh\`
\`= ∫₀¹⁰ π(2)² dh = ∫₀¹⁰ 4π dh\`
\`= [4πh]₀¹⁰ = 4π(10) - 4π(0) = 40π ≈ 125.66 m³\`
`,
        examples: `Marka aad rabto inaad ogaato inta sonkor ah ee aad ku buuxin karto bakoor weyn oo qaabkiisu aanu joogto ahayn, waxaad isticmaali doontaa integration si aad u xisaabiso mugga bakooriga.`,
        quiz: [
            {
                question: "Waa maxay bedka u dhexeeya qalooca y=x laga bilaabo x=0 ilaa x=4?",
                options: ["4", "16", "8", "2"],
                correctAnswer: "8",
                explanation: "Bedka = ∫₀⁴ x dx = [x²/2]₀⁴ = (4²/2) - (0²/2) = 16/2 = 8."
            },
            {
                question: "Si loo helo mugga shay adag oo lagu abuuray iyadoo lagu wareejiyay qalooca y=f(x) agagaarka x-axis-ka, qaacidee la isticmaalaa?",
                options: ["∫ πf(x) dx", "∫ 2πf(x) dx", "∫ π[f(x)]² dx", "∫ [f(x)]² dx"],
                correctAnswer: "∫ π[f(x)]² dx",
                explanation: "Kani waa 'Disk Method'. Waxaan isku-darnaa mugga saxanno (disks) yaryar oo leh gacan f(x) iyo dhumuc dx."
            }
        ]
    })
];

const transcendental_functions = [
    createCivilLesson('exponential-functions', 'CASHAR 1: Shaqooyinka Exponential (eˣ)', {
        whatIsIt: "Shaqada Exponential (eˣ) waa shaqo ay ku kororto ama ku yaraato qiimaheeda si is-dhaaf ah marka la eego qiimaheeda hadda. `e` waa tiro joogto ah oo xisaabeed (qiyaastii 2.71828) oo ah salka logarithm-ka dabiiciga ah.",
        whyIsItImportant: "Waxay muhiim u tahay moodeelaynta dhacdooyinka dabiiciga ah ee injineernimada. Tusaale ahaan, sida kuleylku uga baxo dhismo, sida ciidda biyuhu uga baxaan (consolidation), ama sida walxaha wasakhaysan ay ugu baaba'aan biyaha. Dhammaan kuwani waxay raacaan qaab exponential ah.",
        howItWorks: `**Tusaale Xisaabeed: Qaboojinta Dhismaha**
Heerkulka gudaha dhismo wuxuu raacayaa qaacidada qaboojinta Newton: \`T(t) = Tₐ + (T₀ - Tₐ)e^(-kt)\`
Halkee:
- T(t) = Heerkulka wakhti 't'
- Tₐ = Heerkulka dibadda (Ambient)
- T₀ = Heerkulka bilowga
- k = Xawaaraha qaboojinta (constant)

**Xaalad:**
Guri heerkulkiisu yahay 25°C (T₀) ayaa la damiyay kuleyliyaha, halka heerkulka dibaddu yahay 10°C (Tₐ). Haddii k=0.1 saacaddii, waa maxay heerkulka guriga 3 saacadood ka dib?

\`\`\`
1. Geli qiimayaasha: T(3) = 10 + (25 - 10)e^(-0.1 * 3)
2. Fududee: T(3) = 10 + 15 * e^(-0.3)
3. Xisaabi e^(-0.3): e^(-0.3) ≈ 0.7408
4. Xisaabi natiijada: T(3) = 10 + 15 * 0.7408 = 10 + 11.112 ≈ 21.11°C
\`\`\`
**Fasiraad:** 3 saacadood ka dib, heerkulka gurigu wuxuu hoos ugu dhici doonaa qiyaastii 21.11°C. Tani waxay muhiim u tahay naqshadaynta nidaamyada kuleylinta iyo qaboojinta (HVAC).`,
        quiz: [
            {
                question: "Haddii qiimaha 'k' ee qaacidada qaboojinta uu weyn yahay, maxay taasi ka dhigan tahay?",
                options: ["Gurigu si tartiib ah ayuu u qaboobayaa", "Gurigu si degdeg ah ayuu u qaboobayaa", "Heerkulku isma beddelayo", "Lama ogaan karo"],
                correctAnswer: "Gurigu si degdeg ah ayuu u qaboobayaa",
                explanation: "Qiimaha 'k' ee weyn wuxuu kordhiyaa heerka qaboojinta, taasoo la micno ah in kuleylku si dhaqso ah uga baxayo dhismaha."
            }
        ]
    }),
    createCivilLesson('logarithmic-functions', 'CASHAR 2: Shaqooyinka Logarithmic (ln x)', {
        whatIsIt: "Shaqada Logarithmic waa lidka (inverse) shaqada exponential. Waxay ka jawaabtaa su'aasha: 'Awood intee le'eg ayaa loo baahan yahay in lagu koriyo salka (e) si loo helo tiro gaar ah?'. `ln(x)` waxaa loo isticmaalaa in lagu cabbiro dhacdooyin baaxaddoodu aad u kala duwan tahay.",
        whyIsItImportant: "Injineernimada, waxaa loo isticmaalaa cabbirka dhulgariirka (Richter scale), heerka sanqadha (decibels), iyo xisaabinta wakhtiga ay qaadanayso in geeddi-socod gaar ah uu dhammaado, sida adkaanshaha ciidda (soil consolidation).",
        howItWorks: `**Tusaale Xisaabeed: Wakhtiga Adkaanshaha Ciidda**
Wakhtiga ay qaadanayso in ciiddu ay gaarto heer go'an oo adkaansho ah waxaa lagu qiyaasi karaa: \`t = (1/k) * ln(C₀/C(t))\`
Halkee:
- t = Wakhtiga
- k = Xawaaraha adkaanshaha (constant)
- C₀ = Cadaadiska biyaha ee bilowga
- C(t) = Cadaadiska biyaha ee wakhti 't'

**Xaalad:**
Lakab dhoobo ah oo ku hoos jira aasaas cusub wuxuu leeyahay cadaadis biyo bilow ah (C₀) oo ah 400 kPa. Haddii k=0.02 bishii, intee in le'eg ayay qaadanaysaa in cadaadisku hoos ugu dhaco 50 kPa (C(t))?

\`\`\`
1. Geli qiimayaasha: t = (1/0.02) * ln(400 / 50)
2. Fududee: t = 50 * ln(8)
3. Xisaabi ln(8): ln(8) ≈ 2.079
4. Xisaabi natiijada: t = 50 * 2.079 ≈ 103.95 bilood
\`\`\`
**Fasiraad:** Waxay qaadan doontaa qiyaastii 104 bilood (ku dhowaad 8.7 sano) in ciiddu ay gaarto heerkan adkaanshaha. Aqoontani waxay muhiim u tahay qorsheynta dhismaha muddada dheer.`,
        quiz: [
            {
                question: "Shaqada logarithmic, marka qiimaha 'x' uu kordho, maxaa ku dhaca ln(x)?",
                options: ["Si degdeg ah ayuu u kordhayaa", "Si tartiib ah ayuu u kordhayaa", "Wuu yaraanayaa", "Isma beddelayo"],
                correctAnswer: "Si tartiib ah ayuu u kordhayaa",
                explanation: "Kororka ln(x) wuu gaabiyaa marka x uu weynaado. Tusaale ahaan, farqiga u dhexeeya ln(10) iyo ln(1) aad ayuu uga weyn yahay kan u dhexeeya ln(100) iyo ln(91)."
            }
        ]
    }),
    createCivilLesson('trigonometric-functions', 'CASHAR 3: Shaqooyinka Trigonometric (sin x, cos x)', {
        whatIsIt: "Shaqooyinka Trigonometric (Sine iyo Cosine) waxay qeexaan dhaqdhaqaaq wareegsan oo soo noqnoqda (periodic motion). Waxay muhiim u yihiin moodeelaynta dhacdooyin kasta oo leh qaab hirar ah, sida gariirka, hirarka biyaha, iyo culeysyada isbedbeddela.",
        whyIsItImportant: "Waxay fure u yihiin falanqaynta firfircoon (dynamic analysis) ee qaab-dhismeedyada. Dhismayaasha dhaadheer waxay la kulmaan gariir ka dhasha dabaysha, buundooyinkuna waxay la kulmaan gariir ka dhasha gaadiidka. Shaqooyinkan waxay noo oggolaanayaan inaan saadaalino dhaqankaas si aan u naqshadeyno dhismayaal adkeysi u leh.",
        howItWorks: `**Tusaale Xisaabeed: Gariirka Buundada**
Gariirka buundo waxaa lagu matali karaa: \`F(t) = A * sin(ωt + φ)\`
Halkee:
- F(t) = Xoogga wakhti 't'
- A = Baaxadda gariirka (Amplitude)
- ω = Xawaaraha xagasha (Angular frequency)
- φ = Wejiga bilowga (Phase angle)

**Xaalad:**
Buundo waxay la kulantay gariir baaxaddiisu tahay 50 kN (A), xawaarihiisuna yahay 0.8 rad/s (ω), iyadoo aan lahayn weji bilow ah (φ=0). Waa maxay xoogga saaran buundada 10 ilbiriqsi ka dib?

\`\`\`
1. Geli qiimayaasha: F(10) = 50 * sin(0.8 * 10)
2. Fududee: F(10) = 50 * sin(8)
3. Xisaabi sin(8): sin(8) ≈ 0.989 (Hubi in calculator-kaagu ku jiro 'radians')
4. Xisaabi natiijada: F(10) = 50 * 0.989 ≈ 49.47 kN
\`\`\`
**Fasiraad:** 10 ilbiriqsi ka dib, xoogga gariirku wuxuu ku dhow yahay baaxaddiisii ugu sarreysay. Fahamka xoogaggan isbedbeddelaya waxay muhiim u tahay ka hortagga daalka birta (metal fatigue).`,
        quiz: [
            {
                question: "Maxaa dhacaya haddii xawaaraha xagasha (ω) ee gariirka uu la mid noqdo xawaaraha dabiiciga ah ee buundada?",
                options: ["Gariirku wuu istaagayaa", "Waxba isma beddelayaan", "Waxaa dhacaya 'Resonance', gariirkuna si halis ah ayuu u weynaanayaa", "Buundadu way adkaanaysaa"],
                correctAnswer: "Waxaa dhacaya 'Resonance', gariirkuna si halis ah ayuu u weynaanayaa",
                explanation: "Resonance waa dhacdo halis ah oo keeni karta burbur, sida kii ku dhacay Buundada Tacoma Narrows."
            }
        ]
    }),
// FIX: Corrected syntax errors within the howItWorks template literal and removed an extra argument from the function call.
    createCivilLesson('inverse-trigonometric-functions', 'CASHAR 4: Shaqooyinka Inverse Trigonometric (arcsin x, iwm.)', {
        whatIsIt: "Shaqooyinka Inverse Trigonometric waxay sameeyaan shaqada lidka ku ah tan trigonometric. Haddii aad taqaan saamiga dhinacyada saddex-xagal, shaqooyinkani waxay ku siinayaan xagasha. Tusaale: `arcsin(0.5)` waxay ku weydiinaysaa 'waa maxay xagasha sine-keedu yahay 0.5?', jawaabtuna waa 30°.",
        whyIsItImportant: "Waxay lagama maarmaan u yihiin xallinta joometeriga ee naqshadeynta. Marka la naqshadeynayo jiirada waddo, saqafka dhismo, ama xagasha biraha isku-xirka (truss members), waxaan u baahanahay inaan helno xagasha saxda ah ee ku saleysan cabbirrada la rabo.",
        howItWorks: `**Tusaale Xisaabeed: Naqshadaynta Jiirada Waddo (Ramp)**
Waddo loogu talagalay dadka naafada ah waa inaysan lahaan jiirad ka badan xagal gaar ah. Waxaan rabnaa inaan dhisno waddo kor u kacaysa 1 mitir (h) masaafo toosan oo ah 12 mitir (L). Waa maxay xagasha jiirada (θ)?

1. **Aqoonso Shaqada:** Waxaan haynaa dhinaca ka soo horjeeda (h) iyo kan ku dhow (L). Marka waxaan isticmaaleynaa \`arctan\`.
2. **Qaacidada:** \`θ = arctan(h/L)\`
3. **Geli qiimayaasha:** \`θ = arctan(1 / 12)\`
4. **Fududee:** \`θ = arctan(0.0833)\`
5. **Xisaabi:** \`θ ≈ 4.76°\`

**Fasiraad:** Xagasha jiiradu waa 4.76 darajo. Injineerku wuxuu markaa la barbar dhigayaa xeerarka dhismaha si loo hubiyo in jiiradani ay tahay mid la oggol yahay oo badbaado leh.`,
        quiz: [
            {
                question: "Birta isku-xirka (truss member) ee buundo waxay leedahay dherer (hypotenuse) ah 10m waxayna kor u kacaysaa 6m (vertical). Waa maxay xagasha ay dhulka la samaynayso?",
                options: ["arcsin(10/6)", "arccos(6/10)", "arcsin(6/10)", "arctan(6/10)"],
                correctAnswer: "arcsin(6/10)",
                explanation: "Waxaan haynaa dhinaca ka soo horjeeda (6m) iyo hypotenuse (10m). Shaqada isku xirta labadan waa Sine. Sidaa darteed, si aan u helno xagasha, waxaan isticmaaleynaa arcsin."
            }
        ]
    })
];

const integration_techniques = [
    createCivilLesson('integration-substitution-volume', 'Integration by Substitution', {
        whatIsIt: "Integration by Substitution waa habka ugu fudud ee integration-ka. Waxaa loo isticmaalaa marka shaqadu ay tahay mid adag oo aan la integreyn karin si toos ah.",
        whyIsItImportant: "Xisaabinta Mugga Tiir Qaloocan: Waxaad rabtaa inaad ogaato mugga tiir qaloocan oo leh qaab cilindir ah laakiin leh bed kala duwan.",
        howItWorks: "Mugga tiir: `V = ∫ A(x) dx`\n`A(x) = π × [r(x)]²`\n`r(x) = 2 + sin(πx/10)`",
        examples: "`V = ∫₀¹⁰ π × (2 + sin(πx/10))² dx`\nHaddii aan dhigno `u = πx/10`, markaas `du = (π/10) dx`.\n`V = (10/π) ∫ π × (2 + sin(u))² du`",
        mainParts: { title: "Goorta Loo Baahanyahay", content: "• Xisaabinta mugga qalabka qaloocan\n• Qorsheynta birta la bixiyay\n• Hisaabida kaydka qalabka" }
    }),
    createCivilLesson('integration-parts-load', 'Integration by Parts', {
        whatIsIt: "Integration by Parts waa hab integration-ka oo lagu isticmaalo marka shaqadu ay ka kooban tahay isku dhufasho laba shaqoood.",
        whyIsItImportant: "Xisaabinta Culeyska Birta Goynta: Waxaad rabtaa inaad xisaabiso culeyska birta goynta oo leh qaab kala duwan.",
        howItWorks: "Culeyska: `W = ∫ x × f(x) dx`\nHalkee `f(x) = √(x² + 1)`\nMarka loo eego qaacidada: `∫ u dv = uv - ∫ v du`, waxaan dhigi karnaa `u = x` iyo `dv = √(x² + 1) dx`",
        examples: "Si aan u xallino `∫ x√(x² + 1) dx`, waxaa fudud inaan isticmaalno substitution:\n`u = x² + 1`, markaas `du = 2x dx`.\n`∫ x√(x² + 1) dx = (1/2) ∫ √u du = (1/2) × (2/3)u³/² + C = (1/3)(x² + 1)³/² + C`",
        mainParts: { title: "Goorta Loo Baahanyahay", content: "• Xisaabinta culeyska qalabka qaloocan\n• Qorsheynta birta la bixiyay\n• Hisaabida miisaanka dhismaha" }
    }),
    createCivilLesson('integration-partial-fractions', 'Integration by Partial Fractions', {
        whatIsIt: "Partial Fractions waa habka lagu kala jarjaro shaqooyinka rational si loo fududeeyo integration-ka.",
        whyIsItImportant: "Xisaabinta Culeyska Daqaad Kala Duwan: Waxaad rabtaa inaad xisaabiso culeyska daqaad leh qaab kala duwan.",
        howItWorks: "Culeyska: `W = ∫ [1/(x² - 1)] dx`\nWaxaan u kala jajabineynaa:\n`1/(x² - 1) = A/(x - 1) + B/(x + 1)`",
        examples: "Marka la xalliyo A iyo B, waxaan helaynaa `A = 1/2` iyo `B = -1/2`.\nSidaa darteed:\n`∫ [1/(x² - 1)] dx = ∫ [ (1/2)/(x-1) - (1/2)/(x+1) ] dx`\n`= (1/2)[ln|x-1| - ln|x+1|] + C`",
        mainParts: { title: "Goorta Loo Baahanyahay", content: "• Xisaabinta culeyska daqaadyada kala duwan\n• Qorsheynta birta la bixiyay\n• Hisaabida qalabka dhismaha" }
    })
];


// Qaybta 2aad: Physics I (Mechanics)
const physics_units_measurements = [
    createCivilLesson('si-units-conversions', 'SI Units and Conversions', { whatIsIt: "Barashada Nidaamka Caalamiga ah ee Halbeegyada (SI Units) - mitir (m), kiilogaraam (kg), ilbiriqsi (s), iwm. - iyo sida loogu kala beddelo halbeegyada kala duwan."}),
    createCivilLesson('dimensional-analysis', 'Dimensional Analysis', { whatIsIt: "Farsamo awood leh oo loo isticmaalo hubinta is-waafajinta isle'egyada fiisigiska iyadoo la falanqeynayo halbeegyadooda aasaasiga ah (Mass, Length, Time)."}),
    createCivilLesson('measurement-techniques', 'Measurement Techniques', { whatIsIt: "Barashada isticmaalka qalabka cabbirka ee aasaasiga ah iyo fahamka fikradaha saxnaanta (accuracy) iyo qummanaanta (precision)."}),
];
// ... Dhammaan casharrada kale ee Physics I ...

// Qaybta 3aad: Engineering Drawing
const drawing_intro = [
    createCivilLesson('drawing-instruments', 'Drawing Instruments', { whatIsIt: "Barashada iyo isticmaalka qalabka aasaasiga ah ee sawirka farsamada, sida T-squares, set squares, compasses, iyo miisaanno (scales)."}),
    createCivilLesson('lettering-line-types', 'Lettering and Line Types', { whatIsIt: "Barashada heerarka qoraalka farsamada iyo noocyada kala duwan ee xariiqyada iyo macnahooda sawirka injineernimada."}),
    createCivilLesson('scales-dimensions', 'Scales and Dimensions', { whatIsIt: "Fahamka sida loo isticmaalo miisaannada si loo matalo walxo waaweyn warqad yar iyo sida saxda ah ee loo cabbiro sawirrada."}),
];
// ... Dhammaan casharrada kale ee Engineering Drawing ...

// ... Ku celi qaabkan dhammaan 8-da qaybood ee Sanadka 1aad ...

export const civilEngineeringDiscipline: Discipline = {
  id: 'civil-engineering',
  name: 'Civil Engineering',
  icon: BuildingIcon,
  description: 'Naqshadee, dhis, oo dayactir kaabayaasha aasaasiga ah ee bulshada casriga ah.',
  labs: civilEngineeringLabs,
  levels: [
    {
      id: 'civil-year-1',
      name: 'SANADKA 1AAD: Aasaaska Injineernimada',
      description: 'Baro xisaabta, sayniska, iyo aqoonta aasaasiga ah ee injineernimada oo saldhig u ah dhammaan qaybaha kale.',
      modules: [
        // Qaybta 1aad: Calculus I
        { id: 'civil-y1-m1', title: 'Calculus I: Functions and Limits', lessons: calculus_functions_limits },
        { id: 'civil-y1-m2', title: 'Calculus I: Derivatives and Applications', lessons: calculus_derivatives },
        { id: 'civil-y1-m3', title: 'Calculus I: Integration', lessons: calculus_integration },
        { id: 'civil-y1-m4', title: 'Calculus I: Transcendental Functions', lessons: transcendental_functions },
        { id: 'civil-y1-m5', title: 'Calculus I: Techniques of Integration', lessons: integration_techniques },

        // Qaybta 2aad: Physics I (Mechanics)
        { id: 'civil-y1-m6', title: 'Physics I: Units and Measurements', lessons: physics_units_measurements },
        { id: 'civil-y1-m7', title: 'Physics I: Kinematics', lessons: [createCivilLesson('kin-1d', 'Motion in One Dimension', {}), createCivilLesson('kin-projectile', 'Projectile Motion', {}), createCivilLesson('kin-circular', 'Circular Motion', {})] },
        { id: 'civil-y1-m8', title: "Physics I: Newton's Laws of Motion", lessons: [createCivilLesson('newton-force', 'Force and Acceleration', {}), createCivilLesson('newton-friction', 'Friction Forces', {}), createCivilLesson('newton-apps', 'Applications in Engineering', {})] },
        { id: 'civil-y1-m9', title: 'Physics I: Work, Energy, and Power', lessons: [createCivilLesson('wep-ke-pe', 'Kinetic and Potential Energy', {}), createCivilLesson('wep-conservation', 'Conservation of Energy', {}), createCivilLesson('wep-power', 'Power Calculations', {})] },
        { id: 'civil-y1-m10', title: 'Physics I: Rotational Motion', lessons: [createCivilLesson('rot-torque', 'Torque and Angular Momentum', {}), createCivilLesson('rot-inertia', 'Moment of Inertia', {}), createCivilLesson('rot-dynamics', 'Rotational Dynamics', {})] },
        { id: 'civil-y1-m11', title: 'Physics I: Gravitation', lessons: [createCivilLesson('grav-newton', "Newton's Law of Gravitation", {}), createCivilLesson('grav-planetary', 'Planetary Motion', {}), createCivilLesson('grav-satellite', 'Satellite Dynamics', {})] },

        // Qaybta 3aad: Engineering Drawing
        { id: 'civil-y1-m12', title: 'Drawing: Introduction to Technical Drawing', lessons: drawing_intro },
        { id: 'civil-y1-m13', title: 'Drawing: Orthographic Projections', lessons: [createCivilLesson('ortho-first', 'First Angle Projection', {}), createCivilLesson('ortho-third', 'Third Angle Projection', {}), createCivilLesson('ortho-multi', 'Multi-view Drawings', {})] },
        { id: 'civil-y1-m14', title: 'Drawing: Isometric Projections', lessons: [createCivilLesson('iso-axes', 'Isometric Axes and Scales', {}), createCivilLesson('iso-tech', 'Isometric Drawing Techniques', {}), createCivilLesson('iso-convert', 'Conversion from Orthographic', {})] },
        { id: 'civil-y1-m15', title: 'Drawing: Sectional Views', lessons: [createCivilLesson('sec-full', 'Full Sections', {}), createCivilLesson('sec-half', 'Half Sections', {}), createCivilLesson('sec-offset', 'Offset Sections', {})] },
        { id: 'civil-y1-m16', title: 'Drawing: Dimensioning Techniques', lessons: [createCivilLesson('dim-linear', 'Linear Dimensioning', {}), createCivilLesson('dim-angular', 'Angular Dimensioning', {}), createCivilLesson('dim-tolerances', 'Tolerances', {})] },
        { id: 'civil-y1-m17', title: 'Drawing: Introduction to CAD', lessons: [createCivilLesson('cad-basic', 'Basic CAD Commands', {}), createCivilLesson('cad-2d', '2D Drawing in AutoCAD', {}), createCivilLesson('cad-plot', 'Plotting and Printing', {})] },

        // Qaybta 4aad: General Chemistry
        { id: 'civil-y1-m18', title: 'Chemistry: Atomic Structure', lessons: [createCivilLesson('chem-atomic', 'Atomic Theory', {}), createCivilLesson('chem-config', 'Electronic Configuration', {}), createCivilLesson('chem-periodic', 'Periodic Table', {})] },
        { id: 'civil-y1-m19', title: 'Chemistry: Chemical Bonding', lessons: [createCivilLesson('bond-ionic', 'Ionic Bonds', {}), createCivilLesson('bond-covalent', 'Covalent Bonds', {}), createCivilLesson('bond-metallic', 'Metallic Bonds', {})] },
        { id: 'civil-y1-m20', title: 'Chemistry: Stoichiometry', lessons: [createCivilLesson('stoich-eq', 'Chemical Equations', {}), createCivilLesson('stoich-mole', 'Mole Concept', {}), createCivilLesson('stoich-calc', 'Reaction Calculations', {})] },
        { id: 'civil-y1-m21', title: 'Chemistry: States of Matter', lessons: [createCivilLesson('matter-states', 'Gases, Liquids, and Solids', {}), createCivilLesson('matter-phase', 'Phase Changes', {}), createCivilLesson('matter-laws', 'Gas Laws', {})] },
        { id: 'civil-y1-m22', title: 'Chemistry: Chemical Reactions', lessons: [createCivilLesson('react-acid', 'Acid-Base Reactions', {}), createCivilLesson('react-redox', 'Oxidation-Reduction', {}), createCivilLesson('react-precip', 'Precipitation Reactions', {})] },
        { id: 'civil-y1-m23', title: 'Chemistry: Basic Electrochemistry', lessons: [createCivilLesson('electro-cells', 'Electrolytic Cells', {}), createCivilLesson('electro-corrosion', 'Corrosion Principles', {}), createCivilLesson('electro-battery', 'Battery Technology', {})] },

        // Qaybta 5aad: Introduction to Engineering
        { id: 'civil-y1-m24', title: 'Intro to Eng: History of Engineering', lessons: [createCivilLesson('hist-ancient', 'Ancient Engineering', {}), createCivilLesson('hist-industrial', 'Industrial Revolution', {}), createCivilLesson('hist-modern', 'Modern Engineering', {})] },
        { id: 'civil-y1-m25', title: 'Intro to Eng: Engineering Ethics', lessons: [createCivilLesson('eth-resp', 'Professional Responsibility', {}), createCivilLesson('eth-code', 'Code of Ethics', {}), createCivilLesson('eth-case', 'Case Studies', {})] },
        { id: 'civil-y1-m26', title: 'Intro to Eng: Engineering Disciplines', lessons: [createCivilLesson('disc-civil', 'Civil Engineering Specializations', {}), createCivilLesson('disc-related', 'Related Engineering Fields', {}), createCivilLesson('disc-paths', 'Career Paths', {})] },
        { id: 'civil-y1-m27', title: 'Intro to Eng: Problem-Solving Methods', lessons: [createCivilLesson('prob-design', 'Engineering Design Process', {}), createCivilLesson('prob-critical', 'Critical Thinking', {}), createCivilLesson('prob-decision', 'Decision Making', {})] },
        { id: 'civil-y1-m28', title: 'Intro to Eng: Engineering Design Process', lessons: [createCivilLesson('des-prob', 'Problem Identification', {}), createCivilLesson('des-sol', 'Solution Development', {}), createCivilLesson('des-plan', 'Implementation Planning', {})] },
        { id: 'civil-y1-m29', title: 'Intro to Eng: Career Opportunities', lessons: [createCivilLesson('car-const', 'Construction Industry', {}), createCivilLesson('car-consult', 'Consulting Firms', {}), createCivilLesson('car-gov', 'Government Agencies', {})] },

        // Qaybta 6aad: Computer Applications
        { id: 'civil-y1-m30', title: 'Computer: MS Office Applications', lessons: [createCivilLesson('comp-word', 'Word for Technical Reports', {}), createCivilLesson('comp-excel', 'Excel for Engineering Calculations', {}), createCivilLesson('comp-ppt', 'PowerPoint for Presentations', {})] },
        { id: 'civil-y1-m31', title: 'Computer: Basic Programming Concepts', lessons: [createCivilLesson('prog-algo', 'Algorithm Development', {}), createCivilLesson('prog-flow', 'Flowcharting', {}), createCivilLesson('prog-python', 'Introduction to Python', {})] },
        { id: 'civil-y1-m32', title: 'Computer: Engineering Software Overview', lessons: [createCivilLesson('soft-cad', 'CAD Software Introduction', {}), createCivilLesson('soft-analysis', 'Analysis Tools', {}), createCivilLesson('soft-sim', 'Simulation Software', {})] },
        { id: 'civil-y1-m33', title: 'Computer: Internet Research Skills', lessons: [createCivilLesson('res-tech', 'Technical Information Search', {}), createCivilLesson('res-db', 'Academic Databases', {}), createCivilLesson('res-online', 'Online Resources', {})] },
        { id: 'civil-y1-m34', title: 'Computer: Data Analysis Basics', lessons: [createCivilLesson('data-stat', 'Statistical Calculations', {}), createCivilLesson('data-pres', 'Data Presentation', {}), createCivilLesson('data-plot', 'Graph Plotting', {})] },
        
        // Qaybta 7aad: Communication Skills
        { id: 'civil-y1-m35', title: 'Communication: Technical Report Writing', lessons: [createCivilLesson('comm-struct', 'Report Structure', {}), createCivilLesson('comm-lang', 'Technical Language', {}), createCivilLesson('comm-std', 'Documentation Standards', {})] },
        { id: 'civil-y1-m36', title: 'Communication: Presentation Skills', lessons: [createCivilLesson('pres-public', 'Public Speaking', {}), createCivilLesson('pres-visual', 'Visual Aids Preparation', {}), createCivilLesson('pres-aud', 'Audience Engagement', {})] },
        { id: 'civil-y1-m37', title: 'Communication: Professional Communication', lessons: [createCivilLesson('prof-bus', 'Business Correspondence', {}), createCivilLesson('prof-meet', 'Meeting Etiquette', {}), createCivilLesson('prof-team', 'Team Communication', {})] },
        { id: 'civil-y1-m38', title: 'Communication: Team Communication', lessons: [createCivilLesson('team-dyn', 'Group Dynamics', {}), createCivilLesson('team-res', 'Conflict Resolution', {}), createCivilLesson('team-proj', 'Collaborative Projects', {})] },
        { id: 'civil-y1-m39', title: 'Communication: Engineering Documentation', lessons: [createCivilLesson('doc-proj', 'Project Documentation', {}), createCivilLesson('doc-spec', 'Technical Specifications', {}), createCivilLesson('doc-qual', 'Quality Records', {})] },

        // Qaybta 8aad: Somaliya Engineering
        { id: 'civil-y1-m40', title: 'Somalia Eng: Engineering History in Somalia', lessons: [createCivilLesson('som-trad', 'Traditional Building Methods', {}), createCivilLesson('som-col', 'Colonial Engineering Works', {}), createCivilLesson('som-post', 'Post-Independence Development', {})] },
        { id: 'civil-y1-m41', title: 'Somalia Eng: Local Construction Materials', lessons: [createCivilLesson('mat-ind', 'Indigenous Materials', {}), createCivilLesson('mat-mod', 'Modern Material Availability', {}), createCivilLesson('mat-sust', 'Sustainable Alternatives', {})] },
        { id: 'civil-y1-m42', title: 'Somalia Eng: Somali Building Codes', lessons: [createCivilLesson('code-nat', 'National Standards', {}), createCivilLesson('code-safe', 'Safety Regulations', {}), createCivilLesson('code-env', 'Environmental Considerations', {})] },
        { id: 'civil-y1-m43', title: 'Somalia Eng: Environmental Considerations', lessons: [createCivilLesson('env-clim', 'Climate Impact on Structures', {}), createCivilLesson('env-water', 'Water Management', {}), createCivilLesson('env-prot', 'Environmental Protection', {})] },
        { id: 'civil-y1-m44', title: 'Somalia Eng: Case Studies of Local Projects', lessons: [createCivilLesson('case-succ', 'Successful Projects', {}), createCivilLesson('case-chall', 'Challenges and Solutions', {}), createCivilLesson('case-fut', 'Future Opportunities', {})] },
      ],
    },
    {
        id: 'civil-year-2',
        name: 'SANADKA 2AAD: Qalabaynta Aasaasiga ah',
        description: 'Baro fikradaha iyo qalabka aasaasiga u ah laamaha kala duwan ee injineernimada madaniga.',
        modules: [
            { id: 'civil-y2-m1', title: 'Makaanikada Injineernimada', lessons: [
                createCivilLesson('eng-mechanics', 'Engineering Mechanics (Statics & Dynamics)', { whatIsIt: "Barashada saameynta xoogaggu ku leeyihiin walxaha, marka ay nasanayaan (statics) iyo marka ay dhaqaaqayaan (dynamics)." }),
                createCivilLesson('strength-materials', 'Awoodda Walxaha (Strength of Materials)', { 
                    whatIsIt: "Awoodda Walxaha, oo sidoo kale loo yaqaan Makaanikada Walxaha, waa laan injineernimo oo barata saameynta xoogagga dibadda ku leeyihiin walxaha adag. Waxay falanqeysaa **stress** (cadaadiska gudaha ee walaxda), **strain** (heerka ay walaxdu isu beddesho qaab ahaan), iyo xiriirka ka dhexeeya labadooda. Fikradaha asaasiga ah waxaa ka mid ah elasticity (awoodda walaxdu ugu soo laaban karto qaabkeedii hore), plasticity (qaab-beddelka joogtada ah), iyo fashilka (failure).",
                    whyIsItImportant: "Waa aasaaska naqshad kasta oo badbaado leh oo waxtar leh ee injineernimada madaniga. La'aanteed faham qoto dheer oo ku saabsan sida walxuhu u dhaqmaan marka culeys la saaro, buundooyinku way dumi lahaayeen, dhismayaashu way dumi lahaayeen, biyo-xireennaduna way jabi lahaayeen. Waxay noo oggolaanaysaa inaan dooranno walaxda saxda ah iyo cabbirka saxda ah ee qayb kasta oo qaab-dhismeedka ah si loo hubiyo inay u adkeysato culeysyada la filayo inta ay nooshahay.",
                    mainParts: `1. **Stress (Cadaadis):** Awoodda gudaha ee halkii bed ee walaxdu isaga caabiso culeyska dibadda (σ = F/A). Waxaa jira noocyo kala duwan:
- **Tensile Stress:** Marka la kala jiidayo walaxda.
- **Compressive Stress:** Marka la isku cadaadinayo walaxda.
- **Shear Stress:** Marka xoogag is barbar socda ay isku dayaan inay walaxda kala gooyaan.
2. **Strain (Kala-bax):** Cabirka qaab-beddelka walaxda marka loo eego cabbirkeedii asalka ahaa (ε = ΔL/L).
3. **Stress-Strain Curve:** Garaaf muujinaya sida walaxdu uga falceliso culeyska sii kordhaya, oo muujinaya xadkeeda elastic-ka, barta dhalidda (yield point), iyo xoogga ugu dambeeya (ultimate strength).`,
                    howItWorks: "Injineeradu waxay isticmaalaan tijaabooyin shaybaar si ay u go'aamiyaan sifooyinka farsamo ee walxaha sida birta iyo shamiitada. Xogtan, oo lagu soo bandhigo qaabka Stress-Strain Curve, ayaa loo isticmaalaa in lagu sameeyo qaacidooyin xisaabeed. Qaacidooyinkan ayaa markaa u oggolaanaya injineerada inay xisaabiyaan stress-ka iyo strain-ka ku dhici doona qaybaha qaab-dhismeedka (sida dogobyada, tiirarka) marka la saaro culeysyo la yaqaan (sida miisaanka dhismaha, dabaysha, dhulgariirka).",
                    examples: `**Kiisaska Dhabta ah ee Adduunka:**

**1. Kiiska Fashilka: Buundada Tacoma Narrows (1940)**
- **Dhacdada:** Buundadan caanka ah ee Maraykanka waxay ku duntay afar bilood oo keliya ka dib markii la furay sababtoo ah dabayl xooggeedu ahaa 40 mayl saacaddii oo keliya. Buundadu waxay bilowday inay si daran u ruxanto (phenomenon loo yaqaan aeroelastic flutter) ilaa ay ugu dambeyntii burburtay.
- **Mabda'a Injineernimada:** Tani waxay tusaale u tahay fashil ka dhashay **resonance** iyo **dynamic loading (culeysyo isbedbeddela)**. Inkastoo birta loo isticmaalay ay ahayd mid ku filan culeysyada taagan (static loads) sida miisaanka baabuurta, naqshadda buundada oo aad u dhuubneyd oo fududeyd ayaa ka dhigtay mid u nugul gariirka dabaysha. Marka inta jeer ee gariirka dabayshu ay la mid noqotay inta jeer ee dabiiciga ah ee buundada (natural frequency), gariirku wuu sii weynaaday ilaa uu gaaray heer uu dhaafiyay awoodda walaxdu u leedahay inay u adkeysato *stress*-ka soo noqnoqda (fatigue failure). Casharka halkan laga bartay waa muhiimadda ay leedahay in la falanqeeyo sida qaab-dhismeedyadu uga falceliyaan culeysyada isbedbeddela, ma aha oo keliya kuwa taagan.

**2. Kiiska Fashilka: Burburka Jidka Lugta ee Hyatt Regency (1981)**
- **Dhacdada:** Laba jid oo lugayn ah oo is dul saarnaa oo ku yaallay hoolka hoteelka Hyatt Regency ee Kansas City ayaa burburay, waxaana ku dhintay 114 qof. Sababtu waxay ahayd isbeddel yar oo naqshadda lagu sameeyay xilligii dhismaha oo ku saabsanaa biraha (hanger rods) sitay jidadka.
- **Mabda'a Injineernimada:** Tani waa tusaale naxdin leh oo ku saabsan fashil ka dhashay **shear stress** iyo **bearing stress** oo xad-dhaaf ah oo ku yimid isku xirka. Naqshaddii asalka ahayd waxay isticmaaleysay hal bir oo dheer oo isku xireysay labada jidba, laakiin naqshadda la dhisay waxay isticmaashay laba bir oo kala go'an, taasoo labanlaabay culeyska saaran lowska (nut) iyo alwaaxa (washer) ee birta sare. Culeyskani wuxuu dhaafiyay awoodda **shear strength** ee alwaaxa, taasoo keentay in lowsku uu ka duso, kaddibna uu burburku dhaco. Casharku waa sida ay muhiim u tahay in si faahfaahsan loo falanqeeyo isku xirka (connections) iyo sida culeysyadu ugu gudbaan, maxaa yeelay waa meelaha ugu nugul qaab-dhismeedka.

**3. Kiiska Guusha: Dhismaha Burj Khalifa**
- **Guusha:** Dhismaha ugu dheer adduunka, Burj Khalifa, wuxuu tusaale cajiib ah u yahay sida loo isticmaalo mabaadi'da Awoodda Walxaha si loo gaaro wax aan horay loo arag. Wuxuu adeegsadaa nidaam qaab-dhismeed "buttressed core".
- **Mabda'a Injineernimada:** Guushu waxay ku jirtaa isticmaalka xariifnimada leh ee **walxaha awoodda sare leh (high-strength materials)**. Waxaa loo isticmaalay shamiito la xoojiyey oo leh awood aad u sarreysa (ilaa 80 MPa) si ay u qaado **compressive stress**-ka weyn ee ka dhasha miisaankiisa. Sidoo kale, waxaa loo isticmaalay birta xoojinta (rebar) si ay u qaado **tensile stress**-ka ka dhasha xoogagga dabaysha. Naqshadda dhismaha ayaa si taxaddar leh u maareysa oo u qaybisa culeysyadan, iyadoo hubinaysa in *stress*-ka ku dhacaya qayb kasta uu ka hooseeyo awoodda walaxdaas. Waa cashar ku saabsan sida isku-darka walxaha saxda ah iyo naqshad caqli-gal ah ay u suurtagelin karto in la dhiso qaab-dhismeedyo waaweyn oo badbaado leh.`,
                    quiz: [
                        {
                            question: "Maxay ahayd sababta ugu weyn ee burburka Buundada Tacoma Narrows?",
                            options: ["Culeys baabuur oo xad-dhaaf ah", "Walax tayo liidata", "Gariirka dabaysha oo la mid noqday inta jeer ee dabiiciga ah ee buundada (resonance)", "Dhulgariir"],
                            correctAnswer: "Gariirka dabaysha oo la mid noqday inta jeer ee dabiiciga ah ee buundada (resonance)",
                            explanation: "Burburku wuxuu ka dhashay culeysyo isbedbeddela (dynamic loads) oo ka yimid dabaysha, taasoo keentay gariir xad-dhaaf ah, ma ahayn culeys taagan (static load) oo fashiliyay."
                        },
                        {
                            question: "Fashilkii Hyatt Regency, isbeddelka naqshadda wuxuu labanlaabay noocee stress ah oo saarnaa isku xirka sare?",
                            options: ["Tensile stress", "Compressive stress", "Shear and bearing stress", "Torsional stress"],
                            correctAnswer: "Shear and bearing stress",
                            explanation: "Isbeddelku wuxuu culeyska oo dhan saaray hal isku xir oo sare, taasoo keentay in lowska iyo alwaaxu ay u adkeysan waayaan shear stress-ka, taasoo keentay in ay duso."
                        },
                        {
                            question: "Si loo qaado culeyska weyn ee miisaankiisa, Burj Khalifa wuxuu si weyn ugu tiirsan yahay walax leh awood sare oo noocee ah?",
                            options: ["Awoodda jiidista (Tensile Strength)", "Awoodda cadaadiska (Compressive Strength)", "Awoodda leexinta (Flexural Strength)", "Awoodda daalka (Fatigue Strength)"],
                            correctAnswer: "Awoodda cadaadiska (Compressive Strength)",
                            explanation: "Shamiitada awoodda sare leh ayaa loo isticmaalaa inay qaado culeyska weyn ee cadaadiska ah ee ka dhasha miisaanka dhismaha oo dhan."
                        }
                    ]
                }, 'lab-compressive-strength'),
            ]},
            { id: 'civil-y2-m2', title: 'Cabbirka Dhulka iyo Biyaha', lessons: [
                createCivilLesson('surveying', 'Surveying', { whatIsIt: "Sayniska iyo farshaxanka cabbirka saxda ah ee dusha dhulka si loo qorsheeyo mashaariicda." }),
                createCivilLesson('fluid-mechanics', 'Fluid Mechanics for Civil Engineers', { whatIsIt: "Barashada dhaqanka dareerayaasha, gaar ahaan biyaha, iyo sida ay ula falgalaan kaabayaasha." }),
            ]},
             { id: 'civil-y2-m3', title: 'Falanqaynta Qaab-dhismeedka Hordhaca ah', lessons: [
                createCivilLesson('struct-analysis-1', 'Structural Analysis I', { whatIsIt: "Falanqaynta qaab-dhismeedyada go'an (statically determinate structures) sida beams, trusses, iyo frames." }),
                createCivilLesson('materials-concrete', 'Civil Engineering Materials (Concrete)', { whatIsIt: "Barashada sifooyinka, naqshadaynta isku-darka, iyo tijaabinta shamiitada." }, 'lab-slump-test'),
                createCivilLesson('materials-steel', 'Civil Engineering Materials (Steel)', { whatIsIt: "Barashada sifooyinka, noocyada, iyo isticmaalka birta ee dhismaha." }),
            ]},
            { id: 'civil-y2-m4', title: 'Xirfadaha Sawirka iyo Xisaabta', lessons: [
                createCivilLesson('autocad-2d-3d', 'AutoCAD (2D & 3D)', { whatIsIt: "Software aasaasi ah oo loo isticmaalo sawirka farsamada ee injineernimada madaniga." }),
                createCivilLesson('numerical-methods', 'Numerical Methods', { whatIsIt: "Isticmaalka hababka xisaabeed ee kombiyuutarka si loo xalliyo dhibaatooyinka injineernimada ee adag." }),
            ]},
        ]
    },
    {
        id: 'civil-year-3',
        name: 'SANADKA 3AAD: Heerka Takhasuska',
        description: 'Si qoto dheer u gal laamaha waaweyn ee injineernimada madaniga, sida wadooyinka, biyaha, iyo maareynta mashaariicda.',
        modules: [
            { id: 'civil-y3-m1', title: 'Injineernimada Wadooyinka & Gaadiidka', lessons: [
                createCivilLesson('highway-eng', 'Highway Engineering', { whatIsIt: "Naqshadaynta joomatari ee waddooyinka, oo ay ku jiraan qaloocyada toosan iyo kuwa jiifba." }),
                createCivilLesson('traffic-eng', 'Traffic Engineering', { whatIsIt: "Barashada iyo maareynta socodka gaadiidka si loo hagaajiyo badbaadada iyo hufnaanta." }),
                createCivilLesson('pavement-design', 'Pavement Design', { whatIsIt: "Naqshadaynta lakabyada dusha sare ee waddooyinka (flexible and rigid pavements) si ay ugu adkaystaan culeyska gaadiidka." }),
            ]},
            { id: 'civil-y3-m2', title: 'Injineernimada Biyaha & Deegaanka', lessons: [
                createCivilLesson('hydraulics-open-channel', 'Open-Channel Hydraulics', { whatIsIt: "Barashada dhaqanka biyaha ee kanaallada furan, sida webiyada iyo kanaallada waraabka." }),
                createCivilLesson('hydrology', 'Hydrology', { whatIsIt: "Barashada meertada biyaha, oo ay ku jiraan roobka, socodka dusha sare, iyo biyaha dhulka hoostiisa." }),
                createCivilLesson('water-supply', 'Water Supply & Wastewater Engineering', { whatIsIt: "Naqshadaynta nidaamyada biyaha la cabo iyo kuwa daaweynta biyaha wasakhda ah." }),
            ]},
            { id: 'civil-y3-m3', title: 'Injineernimada Dhulka & Aasaaska', lessons: [
                createCivilLesson('soil-mechanics', 'Soil Mechanics', { whatIsIt: "Barashada sifooyinka jir ahaaneed iyo farsamo ee ciidda si loo fahmo dhaqankeeda marka culeys la saaro." }),
                createCivilLesson('foundation-eng', 'Foundation Engineering', { whatIsIt: "Naqshadaynta aasaaska dhismayaasha si ay si badbaado leh ugu gudbiyaan culeyska ciidda." }),
            ]},
            { id: 'civil-y3-m4', title: 'Naqshadeynta Qaab-dhismeedka & Maareynta', lessons: [
                createCivilLesson('rc-design-1', 'Reinforced Concrete Design I', { whatIsIt: "Naqshadaynta walxaha aasaasiga ah ee shamiitada la xoojiyey sida beams, slabs, iyo columns." }),
                 createCivilLesson('steel-design-1', 'Steel Structure Design I', { whatIsIt: "Naqshadaynta walxaha birta ah ee isku xiran iyo kuwa cadaadis qaada." }),
                createCivilLesson('project-mgmt', 'Construction Project Management', { whatIsIt: "Barashada mabaadi'da maareynta mashaariicda dhismaha, oo ay ku jiraan qorsheynta, jadwalka, iyo xakamaynta kharashka." }),
            ]},
        ]
    },
     {
        id: 'civil-year-4',
        name: 'SANADKA 4AAD: Software-yada Sare & Mashruuca Qalin-jabinta',
        description: 'Ku dabaq aqoontaada mashaariicda dhabta ah, baro software-yada sare, oo dhammaystir mashruucaaga qalin-jabinta.',
        modules: [
            { id: 'civil-y4-m1', title: 'Software-ka Falanqaynta Qaab-dhismeedka', lessons: [
                createCivilLesson('sw-etabs', 'Structural Design with ETABS', { whatIsIt: "Isticmaalka ETABS si loo moodeeleeyo, loo falanqeeyo, loona naqshadeeyo dhismayaasha dhaadheer." }),
                createCivilLesson('sw-sap2000', 'Advanced Analysis with SAP2000', { whatIsIt: "Isticmaalka SAP2000 falanqaynta qaab-dhismeedyada adag sida buundooyinka iyo taangiyada." }),
                createCivilLesson('sw-safe', 'Foundation Design with SAFE', { whatIsIt: "Isticmaalka SAFE si loo naqshadeeyo aasaasyo kala duwan iyo sagxadaha shamiitada." }),
            ]},
            { id: 'civil-y4-m2', title: 'Software-yada Kaabayaasha & Qiyaasta', lessons: [
                createCivilLesson('sw-civil3d', 'Infrastructure Design with Civil 3D', { whatIsIt: "Isticmaalka Civil 3D naqshadaynta waddooyinka, goobaha, iyo nidaamyada bullaacadaha." }),
                createCivilLesson('quantity-surveying', 'Quantity Surveying & Estimation', { whatIsIt: "Xisaabinta tirada iyo qiimaha agabka, shaqada, iyo qalabka loo baahan yahay mashruuc dhismaha." }),
            ]},
             { id: 'civil-y4-m3', title: 'Xirfadaha Xirfadeed & Anshaxa', lessons: [
                createCivilLesson('skill-contracts', 'Contracts and Specifications', { whatIsIt: "Fahamka qandaraasyada dhismaha, qeexitaannada farsamo, iyo dukumeentiyada tartanka." }),
                createCivilLesson('skill-ethics-adv', 'Professional Ethics and Practice', { whatIsIt: "Daraasad qoto dheer oo ku saabsan anshaxa injineernimada, mas'uuliyadda sharciga, iyo doorka injineerka ee bulshada." }),
            ]},
            { id: 'civil-y4-m4', title: 'Mashruuca Qalin-jabinta', lessons: [
                createCivilLesson('final-project-proposal', 'Final Year Project - Proposal', { whatIsIt: "Diyaarinta soo jeedin cilmi-baaris ama naqshad oo faahfaahsan oo loogu talagalay mashruucaaga qalin-jabinta." }),
                createCivilLesson('final-project-implementation', 'Final Year Project - Implementation & Report', { whatIsIt: "Fulinta mashruucaaga, falanqaynta natiijooyinka, iyo qorista warbixinta farsamo ee kama dambaysta ah." }),
            ]},
        ]
    },
  ],
};
