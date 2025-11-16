
import type { Lab } from '../../types';

export const civilEngineeringLabs: Lab[] = [
    // --- CONCRETE LAB ---
    {
        id: 'lab-slump-test',
        category: 'Concrete',
        title: 'Tijaabada Slump-ka (Slump Test)',
        objective: 'Si loo go\'aamiyo shaqeynta (workability) iyo joogteynta (consistency) ee shamiitada cusub ee la qasay.',
        equipment: [
            'Slump cone (caaryo qaabka koorta u go\'an)',
            'Tamping rod (ul bir ah oo lagu tumo)',
            'Base plate (saxan salka la saaro)',
            'Measuring tape / ruler (cabbir)',
        ],
        theory: 'Tijaabada slump-ku waa habka ugu badan ee loo isticmaalo in lagu cabbiro shaqeynta shamiitada. Shaqeyntu waxay qeexaysaa sida ay u fududahay in la qaso, la dhigo, la isku-dudubo, oo la dhammeeyo shamiitada iyada oo aan lumin isku-haynteeda. Qiimaha slump-ka hooseeya wuxuu muujinayaa shamiito qalalan oo adag in la shaqeeyo, halka qiimaha slump-ka sare uu muujinayo shamiito qoyan oo si fudud u qulquleysa.',
        procedure: [
            'Nadiifi caaryada slump-ka iyo saxanka salka, kuna mari lakab khafiif ah oo saliid ah.',
            'Dhig saxanka salka meel siman oo adag, caaryadana saar dushiisa.',
            'Ku buuxi caaryada shamiito cusub adigoo u qaybinaya 4 lakab oo is le\'eg.',
            'Lakab kasta ku tum 25 jeer adigoo isticmaalaya barta birta ah, si isku mid ah u qaybi tumitaanka.',
            'Marka lakabka sare la dhammeeyo, sim dusha sare ee shamiitada adigoo isticmaalaya barta birta ah.',
            'Si tartiib ah oo toos ah kor ugu qaad caaryada. Ka fogee caaryada shamiitada si aysan u faragelin.',
            'Isla markiiba, dhig caaryada shamiitada dhinaceeda oo cabbir hoos u dhaca (slump-ka) ee shamiitada. Waa farqiga u dhexeeya dhererka caaryada iyo barta ugu sarreysa ee shamiitada dumtay.',
        ],
        inputData: {
            fields: [
                { id: 'h1', label: 'Dhererka Koorta (h1)', unit: 'mm', defaultValue: '300', type: 'number' },
                { id: 'h2', label: 'Dhererka Shamiitada Dumtay (h2)', unit: 'mm', defaultValue: '210', type: 'number' },
            ],
            sampleTable: {
                headers: ['Tijaabo #', 'Dhererka Koorta (h1) (mm)', 'Dhererka Shamiitada (h2) (mm)', 'Slump (mm)'],
                rows: [
                    [1, 300, 225, 75],
                    [2, 300, 210, 90],
                    [3, 300, 215, 85],
                ]
            }
        },
        calculations: [
            { formula: 'Slump = h1 - h2', description: 'Halkee h1 yahay dhererka koorta, h2 na yahay dhererka shamiitada kadib markii koorta laga qaaday.' }
        ],
        exampleCalculation: `Haddii dhererka koortu yahay 300 mm, dhererka shamiitada la cabbirayna uu yahay 210 mm:
Slump = 300 mm - 210 mm = 90 mm`,
        interpretation: 'Slump-ka la helay waxaa loo isticmaalaa in lagu qiimeeyo nooca shamiitada. Tusaale ahaan, slump-ka 75-100 mm wuxuu badanaa ku habboon yahay shubista dogobyada iyo gidaarrada. Slump aad u sarreeya ama aad u hooseeya wuxuu muujin karaa cillad ku jirta isku-darka, sida biyo xad-dhaaf ah ama qadar cement ah oo khaldan.',
        studentQuestions: [
            { question: 'Maxaa dhacaya haddii aad si degdeg ah u qaaddo koorta slump-ka?', answer: 'Waxay keeni kartaa in shamiitadu si aan dabiici ahayn u dunto, taasoo bixinaysa natiijo slump ah oo khaldan.' },
            { question: 'Sharax farqiga u dhexeeya "True Slump", "Shear Slump", iyo "Collapse Slump".', answer: '"True Slump" waa hoos u dhac siman. "Shear Slump" waa marka dhinac ka mid ah shamiitadu uu siibto. "Collapse Slump" waa marka shamiitadu gebi ahaanba dunto, taasoo muujinaysa isku-dhaf aad u qoyan.' },
        ],
        reportTemplate: `**Warbixinta Tijaabada Slump-ka**
- **Taariikhda:**
- **Goobta Mashruuca:**
- **Heerka Shamiitada (Grade):**
- **Xogta La Galiyay:** Dhererka Koorta = ___ mm, Dhererka Shamiitada = ___ mm
- **Xisaabinta:** Slump = ___ mm
- **Natiijada:** Slump-ka la helay waa ___ mm.
- **Fasiraad:** Natiijadan waxay muujineysaa in shaqeynta shamiitadu ay tahay ____.
- **Gunaanad:** Shaqeynta shamiitadu ma waafaqsan tahay qeexitaannada mashruuca? (Haa/Maya)`
    },
    {
        id: 'lab-compressive-strength',
        category: 'Concrete',
        title: 'Tijaabada Awoodda Cadaadiska (Compressive Strength)',
        objective: 'Si loo go\'aamiyo awoodda ugu badan ee shamiitada adkaatay ay u qaadi karto culeyska cadaadiska.',
        equipment: [
            'Cube molds (caaryooyin cube ah, 150mm x 150mm x 150mm)',
            'Compression Testing Machine (CTM)',
            'Tamping rod',
            'Curing tank (taangi lagu bisleeyo)',
        ],
        theory: 'Awoodda cadaadisku waa sifooyinka farsamo ee ugu muhiimsan ee shamiitada. Inta badan qaab-dhismeedyada shamiitada waxay qaadaan culeysyo cadaadis ah. Tijaabadani waxay hubinaysaa in shamiitadu gaartay awooddii naqshadda loogu talagalay (tusaale, M25 oo u dhiganta 25 N/mm² 28 maalmood ka dib).',
        procedure: [
            'Nadiifi oo saliid mari caaryooyinka cube-ka.',
            'Ku buuxi caaryooyinka shamiito cusub adigoo u qaybinaya 3 lakab.',
            'Lakab kasta ku tum 35 jeer adigoo isticmaalaya barta birta ah.',
            'Dusha sare sim, oo ku calaamadee cube-ka macluumaad ku habboon.',
            'Ku kaydi cube-yada meel qoyan 24 saacadood.',
            '24 saacadood ka dib, ka saar cube-yada caaryooyinka oo geli taangiga biyaha si aad u bisleyso (curing) muddo 7 ama 28 maalmood ah.',
            'Maalinta tijaabada, ka soo saar cube-yada biyaha, dusha ka masax, oo cabbir miisaankooda iyo cabbirradooda saxda ah.',
            'Dhig cube-ka bartamaha mashiinka CTM.',
            'Si tartiib ah ugu saar culeyska heer joogto ah (qiyaastii 140 kg/cm²/daqiiqo) ilaa cube-ku ka jabayo.',
            'Diiwaangeli culeyska ugu sarreeya ee uu cube-ku jabay (failure load).',
        ],
        inputData: {
            fields: [
                { id: 'length', label: 'Dhererka Cube-ka', unit: 'mm', defaultValue: '150', type: 'number' },
                { id: 'width', label: 'Ballaca Cube-ka', unit: 'mm', defaultValue: '150', type: 'number' },
                { id: 'load', label: 'Culeyska Jabka (Failure Load)', unit: 'kN', defaultValue: '580', type: 'number' },
            ],
            sampleTable: {
                headers: ['Tijaabo #', 'Culeyska Jabka (kN)', 'Awoodda (MPa)'],
                rows: [
                    [1, 575, 25.56],
                    [2, 582, 25.87],
                    [3, 578, 25.69],
                ]
            }
        },
        calculations: [
            { formula: 'Bedka (Area) = Dhererka × Ballaca', description: 'Bedka dusha sare ee cube-ka ee culeysku saaran yahay.' },
            { formula: 'Awoodda Cadaadiska (σ) = Culeyska Jabka (N) / Bedka (mm²)', description: 'Awooddu waa culeyska halkii bed. Culeyska waa in loo beddelaa Newtons (kN × 1000).' },
        ],
        exampleCalculation: `Haddii cube-ku yahay 150mm x 150mm, culeyska jabkuna yahay 580 kN:
1. Bedka = 150 mm × 150 mm = 22500 mm²
2. Culeyska (N) = 580 kN × 1000 = 580000 N
3. Awoodda = 580000 N / 22500 mm² = 25.78 N/mm² (ama MPa)`,
        interpretation: 'Celceliska awoodda cadaadiska ee saddex cube ayaa la barbar dhigaa awoodda naqshadda looga baahnaa. Haddii natiijadu ay la mid tahay ama ka weyn tahay awoodda loo baahan yahay, shamiitadu waa la aqbalayaa. Haddii ay ka hooseyso, waxay muujinaysaa dhibaato ku jirta agabka, isku-darka, ama habka bisleynta (curing).',
        studentQuestions: [
            { question: 'Maxay muhiim u tahay in shamiitada lagu bisleeyo biyaha?', answer: 'Bisleyntu waxay hubinaysaa in cement-ku si buuxda ula falgalamo biyaha (hydration), taasoo muhiim u ah horumarinta awoodda ugu sarreysa ee shamiitada.' },
            { question: 'Muxuu noqon lahaa saameynta haddii culeyska si degdeg ah loo saaro inta lagu jiro tijaabada?', answer: ' waxay bixin kartaa natiijo awood ah oo si been ah u sarreysa sababtoo ah shamiitadu ma helayso wakhti ay si habboon ugu qaybiso culeyska gudaha.' },
        ],
        reportTemplate: `**Warbixinta Tijaabada Awoodda Cadaadiska**
- **Taariikhda Tijaabada:**
- **Da'da Shamiitada:** (7 maalmood / 28 maalmood)
- **Cabbirrada Cube-ka:** ___ mm x ___ mm
- **Xogta La Galiyay:** Culeyska Jabka = ___ kN
- **Xisaabinta:** Bedka = ___ mm², Awoodda Cadaadiska = ___ MPa
- **Gunaanad:** Awoodda la helay waxay ____ (waafaqsan tahay / aan waafaqsanayn) awoodda naqshadda ee ___ MPa.`
    },
    // Placeholders for other labs
    {
        id: 'lab-mix-design',
        category: 'Concrete',
        title: 'Naqshadaynta Isku-darka Shamiitada (Mix Design)',
        objective: 'In la go\'aamiyo saamiga saxda ah ee cement-ka, ciidda, jaayga, iyo biyaha si loo helo shamiito leh awood iyo shaqeyn la rabo.',
        equipment: [], theory: '', procedure: [], inputData: { fields: [], sampleTable: { headers: [], rows: [] } }, calculations: [], exampleCalculation: '', interpretation: '', studentQuestions: [], reportTemplate: '',
    },
    {
        id: 'lab-sieve-analysis',
        category: 'Soil',
        title: 'Falanqaynta Shaandheynta (Sieve Analysis)',
        objective: 'In la go\'aamiyo qaybinta cabbirka walxaha (particle size distribution) ee muunad ciid ah.',
        equipment: [], theory: '', procedure: [], inputData: { fields: [], sampleTable: { headers: [], rows: [] } }, calculations: [], exampleCalculation: '', interpretation: '', studentQuestions: [], reportTemplate: '',
    }
];
