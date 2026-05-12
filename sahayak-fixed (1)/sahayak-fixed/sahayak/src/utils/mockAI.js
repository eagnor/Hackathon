// ── Mock AI Responses for Hackathon Demo ────────────────────
// Supports: fever, chest pain, back pain, diarrhoea, headache,
//           cough, pregnancy, eye, skin, child/pediatric
// Detects symptom from first user message, then runs that script.

const scripts = {

  fever: {
    en: [
      "How long has the fever been going on?",
      "On a scale of 1 to 10, how severe is the fever?",
      "Are there any other symptoms like cough, headache, or body aches?",
      "Has the patient taken any medication so far?",
      "Does the patient have any chronic conditions like diabetes or hypertension?",
      "Is the patient able to eat and drink normally?",
      "Any difficulty breathing or chest pain?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Viral fever with upper respiratory infection
Recommended action: Teleconsult today
Doctor brief: Patient presents with fever and mild respiratory symptoms. Vitals appear stable. No red flags identified. Recommend symptomatic treatment and monitoring.
Care advice: Keep hydrated, rest well, take paracetamol for fever. Monitor temperature every 4 hours. Seek immediate care if breathing difficulty develops.`,
    ],
    hi: [
      "बुखार कब से है?",
      "1 से 10 के बीच, बुखार कितना गंभीर है?",
      "क्या खांसी, सिरदर्द या शरीर में दर्द जैसे अन्य लक्षण हैं?",
      "क्या मरीज ने अब तक कोई दवा ली है?",
      "क्या मरीज को मधुमेह या उच्च रक्तचाप जैसी कोई पुरानी बीमारी है?",
      "क्या मरीज सामान्य रूप से खा-पी सकता है?",
      "क्या सांस लेने में कठिनाई या सीने में दर्द है?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Viral fever with upper respiratory infection
Recommended action: Teleconsult today
Doctor brief: Patient presents with fever and mild respiratory symptoms. Vitals appear stable. No red flags identified.
Care advice: Keep hydrated, rest well, take paracetamol for fever. Monitor temperature every 4 hours. Seek immediate care if breathing difficulty develops.`,
    ],
    kn: [
      "ಜ್ವರ ಎಷ್ಟು ದಿನಗಳಿಂದ ಇದೆ?",
      "1 ರಿಂದ 10 ರ ಮಾಪನದಲ್ಲಿ, ಜ್ವರ ಎಷ್ಟು ತೀವ್ರವಾಗಿದೆ?",
      "ಕೆಮ್ಮು, ತಲೆನೋವು ಅಥವಾ ಮೈಕೈ ನೋವು ಇದೆಯೇ?",
      "ಮರೀಚಿ ಯಾವುದಾದರೂ ಔಷಧ ತೆಗೆದುಕೊಂಡಿದ್ದಾರೆಯೇ?",
      "ಮಧುಮೇಹ ಅಥವಾ ರಕ್ತದೊತ್ತಡದಂತಹ ದೀರ್ಘಕಾಲಿಕ ಕಾಯಿಲೆ ಇದೆಯೇ?",
      "ಮರೀಚಿ ಸಾಮಾನ್ಯವಾಗಿ ತಿನ್ನುತ್ತಿದ್ದಾರೆಯೇ ಮತ್ತು ನೀರು ಕುಡಿಯುತ್ತಿದ್ದಾರೆಯೇ?",
      "ಉಸಿರಾಟದ ತೊಂದರೆ ಅಥವಾ ಎದೆನೋವು ಇದೆಯೇ?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Viral fever with upper respiratory infection
Recommended action: Teleconsult today
Doctor brief: Patient presents with fever and mild respiratory symptoms. Vitals appear stable.
Care advice: Keep hydrated, rest well, take paracetamol for fever. Monitor temperature every 4 hours.`,
    ],
    ta: [
      "காய்ச்சல் எத்தனை நாட்களாக இருக்கிறது?",
      "1 முதல் 10 வரை, காய்ச்சல் எவ்வளவு தீவிரமானது?",
      "இருமல், தலைவலி அல்லது உடல் வலி போன்ற அறிகுறிகள் உள்ளனவா?",
      "நோயாளி ஏதாவது மருந்து எடுத்துக்கொண்டாரா?",
      "நீரிழிவு அல்லது உயர் இரத்த அழுத்தம் போன்ற நாட்பட்ட நோய் உள்ளதா?",
      "நோயாளி சாதாரணமாக சாப்பிட மற்றும் குடிக்க முடிகிறதா?",
      "சுவாசிக்க சிரமம் அல்லது மார்பு வலி உள்ளதா?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Viral fever with upper respiratory infection
Recommended action: Teleconsult today
Doctor brief: Patient presents with fever and mild respiratory symptoms. Vitals appear stable.
Care advice: நீர் அருந்துங்கள், ஓய்வெடுங்கள், காய்ச்சலுக்கு பாராசிட்டமால் எடுங்கள்.`,
    ],
    te: [
      "జ్వరం ఎన్ని రోజులుగా ఉంది?",
      "1 నుండి 10 స్కేల్‌లో, జ్వరం తీవ్రత ఎంత?",
      "దగ్గు, తలనొప్పి లేదా శరీర నొప్పులు ఉన్నాయా?",
      "రోగి ఏదైనా మందు తీసుకున్నారా?",
      "మధుమేహం లేదా అధిక రక్తపోటు వంటి దీర్ఘకాలిక వ్యాధులు ఉన్నాయా?",
      "రోగి సాధారణంగా తినగలుగుతున్నారా మరియు నీళ్ళు తాగగలుగుతున్నారా?",
      "శ్వాస తీసుకోవడంలో ఇబ్బంది లేదా ఛాతీ నొప్పి ఉందా?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Viral fever with upper respiratory infection
Recommended action: Teleconsult today
Doctor brief: Patient presents with fever and mild respiratory symptoms. Vitals appear stable.
Care advice: నీరు తాగండి, విశ్రాంతి తీసుకోండి, జ్వరానికి పారాసిటమాల్ తీసుకోండి.`,
    ],
    mr: [
      "ताप किती दिवसांपासून आहे?",
      "1 ते 10 च्या प्रमाणात, ताप किती तीव्र आहे?",
      "खोकला, डोकेदुखी किंवा अंगदुखी यांसारखी इतर लक्षणे आहेत का?",
      "रुग्णाने आतापर्यंत कोणते औषध घेतले आहे का?",
      "मधुमेह किंवा उच्च रक्तदाब यांसारखे जुनाट आजार आहेत का?",
      "रुग्ण सामान्यपणे जेवण आणि पाणी घेऊ शकतो का?",
      "श्वास घेण्यात अडचण किंवा छातीत दुखणे आहे का?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Viral fever with upper respiratory infection
Recommended action: Teleconsult today
Doctor brief: Patient presents with fever and mild respiratory symptoms. Vitals appear stable.
Care advice: भरपूर पाणी प्या, विश्रांती घ्या, तापासाठी पॅरासिटामॉल घ्या.`,
    ],
  },

  chest: {
    en: [
      "Where exactly is the chest pain — centre, left, or right side?",
      "Is the pain crushing/squeezing, or sharp and stabbing?",
      "Does the pain spread to the arm, jaw, or back?",
      "Is the patient sweating, feeling dizzy, or short of breath?",
      "How long has this pain been going on?",
      "Does the patient have a history of heart disease or hypertension?",
      "Has the patient taken any medication for this pain?",
      `ASSESSMENT:
Severity: Critical
Likely condition: Suspected acute cardiac event (possible myocardial infarction)
Recommended action: Emergency — call ambulance
Doctor brief: Patient presents with chest pain with radiation and associated symptoms. High suspicion of cardiac event. Requires immediate emergency transfer and ECG.
Care advice: Keep patient still and calm. Do NOT give food or water. Call 108 immediately. Aspirin 325mg if available and no allergy.`,
    ],
    hi: [
      "सीने में दर्द ठीक कहाँ है — बीच में, बाईं ओर या दाईं ओर?",
      "दर्द दबाने वाला है या चुभने वाला?",
      "क्या दर्द हाथ, जबड़े या पीठ तक फैलता है?",
      "क्या मरीज को पसीना आ रहा है, चक्कर आ रहे हैं या सांस लेने में तकलीफ है?",
      "यह दर्द कब से हो रहा है?",
      "क्या मरीज को पहले से हृदय रोग या उच्च रक्तचाप है?",
      "क्या मरीज ने इस दर्द के लिए कोई दवा ली है?",
      `ASSESSMENT:
Severity: Critical
Likely condition: Suspected acute cardiac event (possible myocardial infarction)
Recommended action: Emergency — call ambulance
Doctor brief: High suspicion of cardiac event. Requires immediate emergency transfer and ECG.
Care advice: मरीज को शांत रखें। खाना-पानी न दें। तुरंत 108 पर कॉल करें।`,
    ],
  },

  back: {
    en: [
      "Where exactly is the back pain — upper, middle, or lower back?",
      "Did the pain start after lifting something heavy or a fall?",
      "On a scale of 1 to 10, how severe is the pain right now?",
      "Does the pain shoot down the leg or cause numbness?",
      "Is there any fever, burning urination, or swelling?",
      "How long has this been going on?",
      "Has the patient taken any pain relief medication?",
      `ASSESSMENT:
Severity: Mild
Likely condition: Musculoskeletal back strain / lumbar spasm
Recommended action: Home care
Doctor brief: Patient presents with back pain, likely musculoskeletal in origin. No red flag neurological symptoms identified. Conservative management appropriate.
Care advice: Rest for 2–3 days. Apply warm compress. Ibuprofen or paracetamol for pain. Avoid heavy lifting. Return if numbness or leg weakness develops.`,
    ],
    hi: [
      "पीठ दर्द ठीक कहाँ है — ऊपर, बीच में या नीचे?",
      "क्या दर्द कुछ भारी उठाने या गिरने के बाद शुरू हुआ?",
      "1 से 10 के बीच, अभी दर्द कितना तीव्र है?",
      "क्या दर्द पैर तक जाता है या सुन्नपन होता है?",
      "क्या बुखार, पेशाब में जलन या सूजन है?",
      "यह कब से हो रहा है?",
      "क्या मरीज ने कोई दर्द निवारक दवा ली है?",
      `ASSESSMENT:
Severity: Mild
Likely condition: Musculoskeletal back strain / lumbar spasm
Recommended action: Home care
Doctor brief: Likely musculoskeletal back pain. No neurological red flags.
Care advice: 2–3 दिन आराम करें। गर्म सिकाई करें। दर्द के लिए पैरासिटामॉल लें। भारी न उठाएं।`,
    ],
  },

  diarrhoea: {
    en: [
      "How many times has the patient passed loose stools today?",
      "Is there any blood or mucus in the stools?",
      "Is the patient vomiting as well?",
      "Is the patient able to keep any fluids down?",
      "Are there signs of dehydration — dry mouth, sunken eyes, no urination?",
      "How long has this been going on?",
      "Has the patient eaten anything unusual recently?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Acute gastroenteritis with mild dehydration
Recommended action: Teleconsult today
Doctor brief: Patient presents with diarrhoea and possible dehydration. Assess hydration status carefully. IV fluids may be required if oral rehydration fails.
Care advice: Give ORS every 15 minutes. Continue breast feeding if infant. Avoid solid food for 4 hours. Seek immediate care if no urine for 6 hours or blood in stool.`,
    ],
    hi: [
      "आज मरीज को कितनी बार दस्त हुए?",
      "मल में खून या बलगम है?",
      "क्या मरीज को उल्टी भी हो रही है?",
      "क्या मरीज कुछ भी पानी रख पा रहा है?",
      "निर्जलीकरण के लक्षण हैं — मुँह सूखना, आँखें धंसना, पेशाब न आना?",
      "यह कब से हो रहा है?",
      "क्या मरीज ने हाल ही में कुछ अलग खाया?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Acute gastroenteritis with mild dehydration
Recommended action: Teleconsult today
Doctor brief: Patient with diarrhoea and possible dehydration. Assess hydration carefully.
Care advice: हर 15 मिनट में ORS दें। 4 घंटे ठोस भोजन न दें। 6 घंटे पेशाब न आए तो तुरंत डॉक्टर के पास जाएं।`,
    ],
  },

  headache: {
    en: [
      "Where is the headache — front, sides, back of head, or all over?",
      "On a scale of 1 to 10, how severe is it?",
      "Did the headache come on suddenly or gradually?",
      "Is there any fever, stiff neck, vomiting, or vision changes?",
      "Is there sensitivity to light or noise?",
      "Has the patient had headaches like this before?",
      "Has the patient taken any medication for the headache?",
      `ASSESSMENT:
Severity: Mild
Likely condition: Tension headache / migraine
Recommended action: Home care
Doctor brief: Patient presents with headache without red flag features. No sudden onset, no neck stiffness, no vision loss. Likely tension-type or migraine.
Care advice: Rest in a quiet dark room. Paracetamol 500mg for pain. Drink plenty of water. If headache is worst-ever, sudden, or with neck stiffness — go to hospital immediately.`,
    ],
    hi: [
      "सिरदर्द कहाँ है — सामने, किनारों पर, पीछे या पूरे सिर में?",
      "1 से 10 के बीच, दर्द कितना तीव्र है?",
      "सिरदर्द अचानक शुरू हुआ या धीरे-धीरे?",
      "क्या बुखार, गर्दन में अकड़न, उल्टी या दृष्टि में बदलाव है?",
      "क्या रोशनी या आवाज से परेशानी होती है?",
      "क्या पहले भी ऐसा सिरदर्द हुआ है?",
      "क्या मरीज ने सिरदर्द के लिए कोई दवा ली है?",
      `ASSESSMENT:
Severity: Mild
Likely condition: Tension headache / migraine
Recommended action: Home care
Doctor brief: No red flag features. Likely tension-type or migraine.
Care advice: अंधेरे कमरे में आराम करें। पैरासिटामॉल 500mg लें। पानी पीएं। अचानक तेज दर्द या गर्दन अकड़न हो तो तुरंत अस्पताल जाएं।`,
    ],
  },

  cough: {
    en: [
      "How long has the cough been present?",
      "Is the cough dry or producing phlegm? If phlegm, what colour?",
      "Is there any fever, chest pain, or shortness of breath?",
      "Is the patient coughing up blood?",
      "Does the patient smoke or live with a smoker?",
      "Has the patient lost weight recently or had night sweats?",
      "Has the patient taken any medication for the cough?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Possible pulmonary tuberculosis — needs sputum test
Recommended action: Teleconsult today
Doctor brief: Patient presents with prolonged cough with constitutional symptoms raising suspicion of TB. Sputum AFB smear and chest X-ray required urgently. Refer to nearest DOTS centre.
Care advice: Cover mouth when coughing. Separate utensils. Avoid crowded spaces. Visit nearest PHC for free sputum test. Do NOT start antibiotics without test result.`,
    ],
    hi: [
      "खांसी कब से है?",
      "खांसी सूखी है या बलगम के साथ? बलगम किस रंग का है?",
      "क्या बुखार, सीने में दर्द या सांस लेने में तकलीफ है?",
      "क्या मरीज खून खांस रहा है?",
      "क्या मरीज धूम्रपान करता है?",
      "क्या हाल ही में वजन कम हुआ है या रात को पसीना आता है?",
      "क्या मरीज ने खांसी के लिए कोई दवा ली है?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Possible pulmonary tuberculosis — needs sputum test
Recommended action: Teleconsult today
Doctor brief: TB के लक्षण संभव हैं। तत्काल थूक परीक्षण और छाती का X-ray आवश्यक है।
Care advice: खांसते समय मुँह ढकें। अलग बर्तन उपयोग करें। निकटतम PHC में मुफ्त थूक परीक्षण के लिए जाएं।`,
    ],
  },

  pregnancy: {
    en: [
      "How many weeks or months pregnant is the patient?",
      "Is this her first pregnancy?",
      "Is she experiencing pain, bleeding, or unusual discharge?",
      "Has she been attending antenatal check-ups at the PHC?",
      "Is the baby's movement normal — is she feeling kicks?",
      "Does she have swelling in feet, headache, or blurred vision?",
      "Any history of previous pregnancy complications?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Pregnancy — antenatal monitoring required
Recommended action: Teleconsult today
Doctor brief: Pregnant patient requires antenatal assessment. Check blood pressure and urine for protein to rule out pre-eclampsia. Ensure iron and folic acid supplementation.
Care advice: Attend all antenatal visits. Take iron and folic acid daily. Eat nutritious food. Go to hospital immediately if bleeding, severe headache, or reduced fetal movement.`,
    ],
    hi: [
      "मरीज कितने हफ्तों या महीनों की गर्भवती हैं?",
      "क्या यह उनकी पहली गर्भावस्था है?",
      "क्या दर्द, रक्तस्राव या असामान्य स्राव हो रहा है?",
      "क्या वह PHC में प्रसवपूर्व जाँच के लिए जा रही हैं?",
      "बच्चे की हलचल सामान्य है — क्या किक महसूस होती है?",
      "पैरों में सूजन, सिरदर्द या धुंधली दृष्टि है?",
      "पिछली गर्भावस्था में कोई जटिलता थी?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Pregnancy — antenatal monitoring required
Recommended action: Teleconsult today
Doctor brief: Pregnant patient needs antenatal assessment. Check BP and urine protein.
Care advice: सभी प्रसवपूर्व जाँच में जाएं। रोज आयरन और फोलिक एसिड लें। रक्तस्राव या तेज सिरदर्द पर तुरंत अस्पताल जाएं।`,
    ],
  },

  skin: {
    en: [
      "Where on the body is the skin problem?",
      "Is it a rash, itching, swelling, sores, or discolouration?",
      "How long has it been present?",
      "Is there any fever, joint pain, or discharge from the skin?",
      "Has the patient been in contact with anyone with a similar rash?",
      "Is it spreading or staying in the same area?",
      "Has the patient tried any cream or home remedy?",
      `ASSESSMENT:
Severity: Mild
Likely condition: Contact dermatitis / fungal skin infection
Recommended action: Home care
Doctor brief: Patient presents with localised skin condition. No systemic features. Likely contact dermatitis or superficial fungal infection.
Care advice: Keep area clean and dry. Avoid scratching. Apply antifungal cream (clotrimazole) twice daily. Avoid sharing towels. If spreading or fever develops, return for review.`,
    ],
    hi: [
      "शरीर के किस हिस्से में त्वचा की समस्या है?",
      "क्या यह दाने, खुजली, सूजन, घाव या रंग बदलाव है?",
      "यह कब से है?",
      "क्या बुखार, जोड़ों में दर्द या त्वचा से स्राव है?",
      "क्या मरीज का संपर्क किसी ऐसे व्यक्ति से हुआ है जिसे ऐसे दाने हों?",
      "क्या यह फैल रहा है या एक ही जगह है?",
      "क्या मरीज ने कोई क्रीम या घरेलू उपाय आजमाया है?",
      `ASSESSMENT:
Severity: Mild
Likely condition: Contact dermatitis / fungal skin infection
Recommended action: Home care
Doctor brief: Localised skin condition. No systemic features.
Care advice: क्षेत्र को साफ और सूखा रखें। क्लोट्रिमाजोल क्रीम दिन में दो बार लगाएं। तौलिया साझा न करें।`,
    ],
  },

  eye: {
    en: [
      "Which eye is affected — left, right, or both?",
      "Is there redness, discharge, itching, or pain?",
      "Is there any blurring of vision or sensitivity to light?",
      "Did this start suddenly or gradually?",
      "Has the patient been in contact with anyone with red eyes recently?",
      "Is there any injury or foreign body in the eye?",
      "Has the patient used any eye drops?",
      `ASSESSMENT:
Severity: Mild
Likely condition: Acute conjunctivitis (pink eye)
Recommended action: Home care
Doctor brief: Patient presents with red eye and discharge. Likely acute infective conjunctivitis. No vision loss or corneal involvement noted.
Care advice: Clean eye with clean wet cloth from inner to outer corner. Do not rub eye. Chloramphenicol eye drops 4 times daily. Wash hands frequently. Avoid sharing towels.`,
    ],
    hi: [
      "कौन सी आँख प्रभावित है — बाईं, दाईं, या दोनों?",
      "क्या लालिमा, स्राव, खुजली या दर्द है?",
      "क्या दृष्टि धुंधली है या रोशनी से परेशानी है?",
      "यह अचानक शुरू हुआ या धीरे-धीरे?",
      "क्या हाल ही में लाल आँख वाले व्यक्ति के संपर्क में आए हैं?",
      "क्या आँख में कोई चोट या कुछ गिरा है?",
      "क्या मरीज ने कोई आई ड्रॉप डाली है?",
      `ASSESSMENT:
Severity: Mild
Likely condition: Acute conjunctivitis (pink eye)
Recommended action: Home care
Doctor brief: Likely acute infective conjunctivitis. No vision loss.
Care advice: साफ गीले कपड़े से आँख पोंछें। आँख न रगड़ें। क्लोरामफेनिकॉल आई ड्रॉप दिन में 4 बार डालें।`,
    ],
  },

  child: {
    en: [
      "How old is the child and what is their approximate weight?",
      "What symptoms is the child showing — fever, rash, vomiting, or diarrhoea?",
      "Is the child feeding or drinking normally?",
      "Is the child unusually sleepy, limp, or not responding?",
      "Is there any convulsion or seizure?",
      "Is the child vaccinated — do you have the immunisation card?",
      "How long have the symptoms been present?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Acute febrile illness in child — needs assessment
Recommended action: Teleconsult today
Doctor brief: Paediatric patient with acute febrile illness. Assess for IMCI danger signs. Check hydration and feeding. Malaria RDT if in endemic area.
Care advice: Give paracetamol syrup by weight. Keep child hydrated with ORS or breast milk. Fan the child if hot. Seek immediate care if child becomes limp, unconscious, or has a fit.`,
    ],
    hi: [
      "बच्चे की उम्र और लगभग वजन कितना है?",
      "बच्चे में क्या लक्षण हैं — बुखार, दाने, उल्टी या दस्त?",
      "क्या बच्चा सामान्य रूप से दूध/पानी पी रहा है?",
      "क्या बच्चा असामान्य रूप से सुस्त या जवाब नहीं दे रहा?",
      "क्या कोई दौरा पड़ा है?",
      "क्या बच्चे को टीके लगे हैं — क्या टीकाकरण कार्ड है?",
      "ये लक्षण कब से हैं?",
      `ASSESSMENT:
Severity: Moderate
Likely condition: Acute febrile illness in child — needs assessment
Recommended action: Teleconsult today
Doctor brief: Paediatric patient. Check for IMCI danger signs. Assess hydration.
Care advice: वजन के अनुसार पैरासिटामॉल सिरप दें। ORS से हाइड्रेटेड रखें। बेहोशी या दौरे पर तुरंत अस्पताल जाएं।`,
    ],
  },

};

// ── Symptom detector ─────────────────────────────────────────
const detectSymptom = (firstUserMessage) => {
  const msg = (firstUserMessage || "").toLowerCase();
  if (/chest|heart|cardiac|सीना|सीने|छाती/.test(msg)) return "chest";
  if (/back|spine|lumbar|पीठ|पाठ/.test(msg)) return "back";
  if (/diarr|loose stool|motion|vomit|stomach|दस्त|उल्टी|जुलाब/.test(msg)) return "diarrhoea";
  if (/headache|migraine|head pain|सिरदर्द|डोकेदुखी/.test(msg)) return "headache";
  if (/cough|tb|tuberc|खांसी|खोकला/.test(msg)) return "cough";
  if (/pregnan|maternity|antenatal|delivery|गर्भ/.test(msg)) return "pregnancy";
  if (/skin|rash|itch|fungal|त्वचा/.test(msg)) return "skin";
  if (/eye|vision|conjunctiv|आँख/.test(msg)) return "eye";
  if (/child|baby|infant|toddler|बच्चा/.test(msg)) return "child";
  return "fever";
};

// ── Red-flag detector — checks ALL user messages in conversation ──
const detectRedFlags = (allUserMessages) => {
  const combined = allUserMessages.join(" ").toLowerCase();
  const flags = {
    critical: false,
    moderate: false,
    signals: [],
  };
  // Critical signals
  if (/can'?t breathe|difficulty breath|shortness of breath|सांस नहीं|सांस में तकलीफ|ಉಸಿರಾಟ|శ్వాస/.test(combined)) {
    flags.critical = true; flags.signals.push("breathing difficulty");
  }
  if (/unconscious|faint|collapse|बेहोश|ಮೂರ್ಛೆ|స్పృహ/.test(combined)) {
    flags.critical = true; flags.signals.push("loss of consciousness");
  }
  if (/blood|bleeding|खून|రక్తం|ರಕ್ತ/.test(combined)) {
    flags.critical = true; flags.signals.push("bleeding");
  }
  if (/convuls|seizure|fit|दौरा|ಅಪಸ్మారం/.test(combined)) {
    flags.critical = true; flags.signals.push("seizure");
  }
  if (/\b(8|9|10)\s*(\/\s*10|out of)/.test(combined)) {
    flags.critical = true; flags.signals.push("severe pain (8-10/10)");
  }
  // Moderate signals
  if (/\b(5|6|7)\s*(\/\s*10|out of)/.test(combined)) {
    flags.moderate = true; flags.signals.push("moderate pain (5-7/10)");
  }
  if (/diabetes|hypertens|heart disease|diabetic|मधुमेह|उच्च रक्तचाप/.test(combined)) {
    flags.moderate = true; flags.signals.push("chronic condition");
  }
  if (/3 days|4 days|5 days|week|तीन दिन|चार दिन|हफ्ते/.test(combined)) {
    flags.moderate = true; flags.signals.push("prolonged duration");
  }
  if (/no|not|can't|unable|नहीं|नही/.test(combined) && /eat|drink|food|water|खाना|पानी/.test(combined)) {
    flags.moderate = true; flags.signals.push("unable to eat/drink");
  }
  return flags;
};

// ── Pick next unanswered question intelligently ───────────────
// Each question in the script has a "topic tag". We skip questions whose
// topic has already been answered by the user in a prior message.
const topicPatterns = {
  duration:    /how long|since when|कब से|எத்தனை நாட்|ఎన్ని రోజులు|किती दिवस|ಎಷ್ಟು ದಿನ/i,
  severity:    /scale|1 to 10|severe|intensity|तीव्र|तीव्रता|ತೀವ್ರ|తీవ్రత/i,
  associated:  /other symptoms|also|cough|headache|nausea|associated|अन्य लक्षण|ಇತರ/i,
  medication:  /medicin|drug|tablet|pill|दवा|ಔಷಧ|మందు/i,
  history:     /chronic|diabetes|hypertens|heart|condition|पुरानी बीमारी|ಹಿಂದಿನ/i,
  eating:      /eat|drink|food|water|oral|खाना|पानी|ತಿನ್ನ/i,
  breathing:   /breath|chest pain|सांस|ಉಸಿರ|శ్వాస/i,
  spread:      /spread|radiat|arm|jaw|फैलता|ಹರಡ/i,
  location:    /where|location|centre|left|right|कहाँ|ಎಲ್ಲಿ/i,
  blood:       /blood|mucus|खून|ರಕ್ತ|రక్తం/i,
  vomit:       /vomit|nausea|उल्टी|ವಾಂತಿ|వాంతి/i,
  dehydration: /dehydrat|dry mouth|no urine|sunken|निर्जलीकरण/i,
  stool:       /stool|loose|motion|latrine|दस्त|ಮಲ/i,
};

const getTopicFromQuestion = (question) => {
  for (const [topic, pattern] of Object.entries(topicPatterns)) {
    if (pattern.test(question)) return topic;
  }
  return null;
};

const userAnsweredTopic = (topic, userMessages) => {
  if (!topic) return false;
  // Very rough heuristic: if user wrote more than 3 words mentioning the topic area
  const combined = userMessages.join(" ").toLowerCase();
  const topicKeywords = {
    duration:    /day|week|hour|since|ago|कल|आज|हफ्ते|दिन/,
    severity:    /\d|mild|severe|bad|worse|बहुत|थोड़ा/,
    associated:  /yes|no|also|and|हाँ|नहीं|हां/,
    medication:  /yes|no|paracet|tablet|हाँ|नहीं|दवा/,
    history:     /yes|no|diabetic|normal|हाँ|नहीं/,
    eating:      /yes|no|little|nothing|हाँ|नहीं/,
    breathing:   /yes|no|हाँ|नहीं/,
    spread:      /yes|no|हाँ|नहीं/,
    location:    /left|right|centre|middle|upper|lower|बाईं|दाईं|ऊपर|नीचे/,
    blood:       /yes|no|हाँ|नहीं|blood|खून/,
    vomit:       /yes|no|हाँ|नहीं/,
    dehydration: /yes|no|हाँ|नहीं/,
    stool:       /\d|times|बार/,
  };
  return topicKeywords[topic]?.test(combined) && userMessages.length > 0;
};

// ── Dynamic assessment builder ────────────────────────────────
const buildAssessment = (symptomKey, lang, flags, userMessages) => {
  const base = scripts[symptomKey];
  const baseScript = base[lang] || base.en;
  // Grab the canned assessment from the script (last item always has ASSESSMENT:)
  const cannedAssessment = baseScript[baseScript.length - 1];

  if (!flags.critical && !flags.moderate) return cannedAssessment;

  // Override severity based on detected signals
  let severity = flags.critical ? "Critical" : "Moderate";
  let action = flags.critical
    ? "Emergency — call ambulance"
    : "Teleconsult today";

  // Extract canned condition and care from base assessment
  const lines = cannedAssessment.split("\n").map(l => l.trim()).filter(Boolean);
  const get = (key) => {
    const line = lines.find(l => l.toLowerCase().startsWith(key.toLowerCase() + ":"));
    return line ? line.split(":").slice(1).join(":").trim() : "";
  };

  const condition = get("Likely condition");
  const doctorBrief = flags.critical
    ? `RED FLAGS detected: ${flags.signals.join(", ")}. ${get("Doctor brief")}`
    : `${get("Doctor brief")} Note: ${flags.signals.join(", ")} reported.`;
  const careAdvice = flags.critical
    ? `URGENT: ${flags.signals.join(", ")} detected. Do not delay. Call 108 immediately. ${get("Care advice")}`
    : get("Care advice");

  return `ASSESSMENT:\nSeverity: ${severity}\nLikely condition: ${condition}\nRecommended action: ${action}\nDoctor brief: ${doctorBrief}\nCare advice: ${careAdvice}`;
};

// ── Session state ─────────────────────────────────────────────
let detectedSymptom = null;
let askedQuestionIndices = [];
let sessionUserMessages = [];

export const getMockResponse = (lang, messageIndex, firstUserMessage, allMessages) => {
  // Reset session on first message
  if (messageIndex === 0) {
    detectedSymptom = detectSymptom(firstUserMessage);
    askedQuestionIndices = [];
    sessionUserMessages = [];
  }

  // Track user messages (allMessages is the full conversation array)
  if (allMessages) {
    sessionUserMessages = allMessages
      .filter(m => m.role === "user")
      .map(m => m.content);
  } else if (firstUserMessage) {
    sessionUserMessages = [firstUserMessage];
  }

  const symptomKey = detectedSymptom || "fever";
  const script = scripts[symptomKey];
  const responses = script[lang] || script.en;

  // Separate questions from the final assessment (last item)
  const questions = responses.slice(0, -1);
  const assessmentTemplate = responses[responses.length - 1];

  // Check red flags across entire conversation
  const flags = detectRedFlags(sessionUserMessages);

  // If critical red flags AND we've asked at least 2 questions → jump to assessment
  if (flags.critical && askedQuestionIndices.length >= 2) {
    return buildAssessment(symptomKey, lang, flags, sessionUserMessages);
  }

  // If we've covered enough ground (6+ exchanges or all questions asked) → assessment
  if (messageIndex >= questions.length || askedQuestionIndices.length >= questions.length) {
    return buildAssessment(symptomKey, lang, flags, sessionUserMessages);
  }

  // Pick next question: find first question whose topic hasn't been answered
  for (let i = 0; i < questions.length; i++) {
    if (askedQuestionIndices.includes(i)) continue;
    const topic = getTopicFromQuestion(questions[i]);
    // Skip if user already answered this topic in a previous message
    if (topic && userAnsweredTopic(topic, sessionUserMessages.slice(0, -1))) continue;
    askedQuestionIndices.push(i);
    return questions[i];
  }

  // Fallback: if all questions covered, give assessment
  return buildAssessment(symptomKey, lang, flags, sessionUserMessages);
};

export const USE_MOCK_AI = true;
