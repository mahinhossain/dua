"use client";
import { useState, useEffect } from "react";
import { duas } from "./duaData";
const Dua = () => {
  // দোয়ার লিস্ট
  // const duas = [
  //   {
  //     id: 12,
  //     name: "আউজুবিল্লাহি মিনাশ শাইতানির রাজিম",
  //     arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
  //     transliteration: "A'udhu billahi min ash-shaytan ir-rajim",
  //     meaning: "আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় প্রার্থনা করছি",
  //   },
  //   {
  //     id: 13,
  //     name: "বিসমিল্লাহির রাহমানির রাহিম",
  //     arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  //     transliteration: "Bismillahir Rahmanir Rahim",
  //     meaning: "পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে শুরু করছি",
  //   },
  //   {
  //     id: 1,
  //     name: "দরুদ শরীফ",
  //     arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
  //     transliteration: "Allahumma salli 'ala Muhammad wa 'ala ali Muhammad",
  //     meaning:
  //       "হে আল্লাহ, মুহাম্মদ (সা.) ও তাঁর পরিবারবর্গের উপর রহমত নাযিল করুন",
  //   },
  //   {
  //     id: 2,
  //     name: "সুবহানাল্লাহ",
  //     arabic: "سُبْحَانَ اللَّهِ",
  //     transliteration: "Subhanallah",
  //     meaning: "আল্লাহ পবিত্র ও সকল দোষ-ত্রুটি থেকে মুক্ত",
  //   },
  //   {
  //     id: 3,
  //     name: "আলহামদুলিল্লাহ",
  //     arabic: "الْحَمْدُ لِلَّهِ",
  //     transliteration: "Alhamdulillah",
  //     meaning: "সমস্ত প্রশংসা আল্লাহর জন্য",
  //   },
  //   {
  //     id: 4,
  //     name: "আল্লাহু আকবার",
  //     arabic: "اللَّهُ أَكْبَرُ",
  //     transliteration: "Allahu Akbar",
  //     meaning: "আল্লাহ সর্বশ্রেষ্ঠ",
  //   },
  //   {
  //     id: 5,
  //     name: "লা ইলাহা ইল্লাল্লাহ",
  //     arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
  //     transliteration: "La ilaha illallah",
  //     meaning: "আল্লাহ ছাড়া কোন ইলাহ নেই",
  //   },
  //   {
  //     id: 6,
  //     name: "আস্তাগফিরুল্লাহ",
  //     arabic: "أَسْتَغْفِرُ اللَّهَ",
  //     transliteration: "Astaghfirullah",
  //     meaning: "আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি",
  //   },
  //   {
  //     id: 7,
  //     name: "ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন",
  //     arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
  //     transliteration: "Inna lillahi wa inna ilayhi raji'un",
  //     meaning: "নিশ্চয় আমরা আল্লাহর জন্য এবং নিশ্চয় আমরা তাঁরই কাছে ফিরে যাব",
  //   },
  //   {
  //     id: 8,
  //     name: "মাশাআল্লাহ",
  //     arabic: "مَا شَاءَ اللَّهُ",
  //     transliteration: "MashaAllah",
  //     meaning: "আল্লাহ যা চেয়েছেন তাই হয়েছে",
  //   },
  //   {
  //     id: 9,
  //     name: "জাযাকাল্লাহু খাইরান",
  //     arabic: "جَزَاكَ اللَّهُ خَيْرًا",
  //     transliteration: "JazakAllahu Khayran",
  //     meaning: "আল্লাহ আপনাকে উত্তম প্রতিদান দিন",
  //   },
  //   {
  //     id: 10,
  //     name: "সুবহানাল্লাহি ওয়া বিহামদিহি",
  //     arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
  //     transliteration: "SubhanAllahi wa bihamdihi",
  //     meaning: "আল্লাহ পবিত্র এবং সমস্ত প্রশংসা তাঁরই",
  //   },
  //   {
  //     id: 11,
  //     name: "রব্বানা আতিনা ফিদ্দুনিয়া হাসানাহ",
  //     arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
  //     transliteration: "Rabbana atina fid-dunya hasanah",
  //     meaning: "হে আমাদের রব, আমাদের দুনিয়াতে কল্যাণ দান করুন",
  //   },

  //   {
  //     id: 14,
  //     name: "হাসবুনাল্লাহু ওয়া নিইমাল ওয়াকিল",
  //     arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
  //     transliteration: "Hasbunallahu wa ni'mal wakil",
  //     meaning: "আল্লাহই আমাদের জন্য যথেষ্ট এবং তিনি কতইনা উত্তম কর্মবিধানকর্তা",
  //   },
  //   {
  //     id: 15,
  //     name: "লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ",
  //     arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
  //     transliteration: "La hawla wa la quwwata illa billah",
  //     meaning: "আল্লাহ ছাড়া কোন শক্তি ও ক্ষমতা নেই",
  //   },
  //   {
  //     id: 16,
  //     name: "রব্বি জিদনি ইলমা",
  //     arabic: "رَبِّ زِدْنِي عِلْمًا",
  //     transliteration: "Rabbi zidni ilma",
  //     meaning: "হে আমার রব, আমার জ্ঞান বৃদ্ধি করুন",
  //   },
  //   {
  //     id: 17,
  //     name: "রব্বিগফিরলি ওয়ারহামনি ওয়াজবুরনি",
  //     arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي",
  //     transliteration: "Rabbi ghfirli warhamni wajburni",
  //     meaning:
  //       "হে আমার রব, আমাকে ক্ষমা করুন, দয়া করুন এবং আমার অভাব পূরণ করুন",
  //   },
  //   {
  //     id: 18,
  //     name: "আল্লাহুম্মা বারিক",
  //     arabic: "اللَّهُمَّ بَارِكْ",
  //     transliteration: "Allahumma barik",
  //     meaning: "হে আল্লাহ, বরকত দান করুন",
  //   },
  //   {
  //     id: 19,
  //     name: "ইয়া মুকাল্লিবাল কুলুব",
  //     arabic: "يَا مُقَلِّبَ الْقُلُوبِ",
  //     transliteration: "Ya muqallibal qulub",
  //     meaning: "হে অন্তরসমূহের পরিবর্তনকারী",
  //   },
  //   {
  //     id: 20,
  //     name: "রব্বানা লা তুজিগ কুলুবানা",
  //     arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا",
  //     transliteration: "Rabbana la tuzigh qulubana",
  //     meaning: "হে আমাদের রব, আমাদের অন্তরসমূহকে সত্য থেকে বিচ্যুত করবেন না",
  //   },
  //   {
  //     id: 21,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল জান্নাহ",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ",
  //     transliteration: "Allahumma inni as'alukal jannah",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে জান্নাত চাই",
  //   },
  //   {
  //     id: 22,
  //     name: "আল্লাহুম্মা আফিনি",
  //     arabic: "اللَّهُمَّ عَافِنِي",
  //     transliteration: "Allahumma afini",
  //     meaning: "হে আল্লাহ, আমাকে সুস্থ রাখুন",
  //   },
  //   {
  //     id: 23,
  //     name: "সুবহানাল্লাহি ওয়ালহামদুলিল্লাহি ওয়ালা ইলাহা ইল্লাল্লাহু ওয়াল্লাহু আকবার",
  //     arabic:
  //       "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
  //     transliteration:
  //       "SubhanAllahi walhamdulillahi wa la ilaha illAllahu waAllahu akbar",
  //     meaning:
  //       "আল্লাহ পবিত্র, সমস্ত প্রশংসা আল্লাহর, আল্লাহ ছাড়া কোন ইলাহ নেই, আল্লাহ সর্বশ্রেষ্ঠ",
  //   },
  //   {
  //     id: 24,
  //     name: "আল্লাহুম্মা সল্লি আলা সাইয়িদিনা মুহাম্মাদ",
  //     arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ",
  //     transliteration: "Allahumma salli 'ala sayyidina Muhammad",
  //     meaning: "হে আল্লাহ, আমাদের নেতা মুহাম্মদ (সা.) এর উপর রহমত নাযিল করুন",
  //   },
  //   {
  //     id: 25,
  //     name: "রদ্বিতু বিল্লাহি রব্বা",
  //     arabic: "رَضِيتُ بِاللَّهِ رَبًّا",
  //     transliteration: "Raditu billahi rabba",
  //     meaning: "আমি আল্লাহকে রব হিসেবে মেনে নিলাম",
  //   },
  //   {
  //     id: 26,
  //     name: "আল্লাহুম্মা যাক্কিনা নুরুশ শামসি",
  //     arabic: "اللَّهُمَّ زَكِّنَا نُورَ الشَّمْسِ",
  //     transliteration: "Allahumma zakkina nurash shamsi",
  //     meaning: "হে আল্লাহ, আমাদেরকে সূর্যের আলোর মতো পবিত্র করুন",
  //   },
  //   {
  //     id: 27,
  //     name: "ইন্নাল্লাহা মাআস সাবিরিন",
  //     arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
  //     transliteration: "InnAllaha ma'as sabirin",
  //     meaning: "নিশ্চয় আল্লাহ ধৈর্যশীলদের সাথে আছেন",
  //   },
  //   {
  //     id: 28,
  //     name: "রব্বিশ রাহলি সাদরি",
  //     arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
  //     transliteration: "Rabbi ishrah li sadri",
  //     meaning: "হে আমার রব, আমার বক্ষ প্রশস্ত করে দিন",
  //   },
  //   {
  //     id: 29,
  //     name: "ওয়াল্লাহু খাইরুল হাফিজিন",
  //     arabic: "وَاللَّهُ خَيْرُ الْحَافِظِينَ",
  //     transliteration: "Wallahu khairul hafizin",
  //     meaning: "আর আল্লাহ সর্বোত্তম সংরক্ষণকারী",
  //   },
  //   {
  //     id: 30,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল হুদা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى",
  //     transliteration: "Allahumma inni as'alukal huda",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে হেদায়াত চাই",
  //   },
  //   {
  //     id: 31,
  //     name: "রব্বানা হাব লানা মিন আজওয়াজিনা",
  //     arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا",
  //     transliteration: "Rabbana hab lana min azwajina",
  //     meaning:
  //       "হে আমাদের রব, আমাদেরকে আমাদের স্ত্রীদের মধ্য থেকে (সৎ সন্তান) দান করুন",
  //   },
  //   {
  //     id: 32,
  //     name: "আল্লাহুম্মা ইন্না নাজআলুকা ফি নুহুরিহিম",
  //     arabic: "اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ",
  //     transliteration: "Allahumma inna naj'aluka fi nuhurihim",
  //     meaning: "হে আল্লাহ, আমরা আপনাকে তাদের বিরুদ্ধে রাখছি",
  //   },
  //   {
  //     id: 33,
  //     name: "ফা ইন্না মাআল উসরি ইউসরা",
  //     arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
  //     transliteration: "Fa inna ma'al usri yusra",
  //     meaning: "নিশ্চয় কষ্টের সাথে স্বস্তি আছে",
  //   },
  //   {
  //     id: 34,
  //     name: "আল্লাহুম্মা ইন্নি আউজু বিকা মিনাল কুফরি",
  //     arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْকُفْرِ",
  //     transliteration: "Allahumma inni a'udhu bika minal kufri",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে কুফর থেকে আশ্রয় চাই",
  //   },
  //   {
  //     id: 35,
  //     name: "রব্বানা আতিনা মিল্লাদুনকা রহমাহ",
  //     arabic: "رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً",
  //     transliteration: "Rabbana atina min ladunka rahmah",
  //     meaning: "হে আমাদের রব, আপনার কাছ থেকে আমাদেরকে রহমত দান করুন",
  //   },
  //   {
  //     id: 36,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল আফিয়া",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ",
  //     transliteration: "Allahumma inni as'alukal afiyah",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে সুস্থতা চাই",
  //   },
  //   {
  //     id: 37,
  //     name: "ইয়া হাইয়ু ইয়া কাইয়ুম",
  //     arabic: "يَا حَيُّ يَا قَيُّومُ",
  //     transliteration: "Ya Hayyu Ya Qayyum",
  //     meaning: "হে চিরঞ্জীব, হে বিশ্বজগতের ধারক",
  //   },
  //   {
  //     id: 38,
  //     name: "বিসমিল্লাহিল্লাজি লা ইয়াদুররু মাআসমিহি",
  //     arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ",
  //     transliteration: "Bismillahilladhi la yadurru ma'asmihi",
  //     meaning: "আল্লাহর নামে যার নামের সাথে কোন ক্ষতি নেই",
  //   },
  //   {
  //     id: 39,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকা মুজিবাতি রাহমাতিকা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ",
  //     transliteration: "Allahumma inni as'aluka mujibati rahmatika",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে আপনার রহমত লাভের উপায়সমূহ চাই",
  //   },
  //   {
  //     id: 40,
  //     name: "রব্বানা গফিরলানা জুনুবানা",
  //     arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا",
  //     transliteration: "Rabbana ghfir lana zunubana",
  //     meaning: "হে আমাদের রব, আমাদের পাপসমূহ ক্ষমা করুন",
  //   },
  //   {
  //     id: 41,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল হুদা ওয়াত তুক্বা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى",
  //     transliteration: "Allahumma inni as'alukal huda wat-tuqa",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে হেদায়েত ও তাকওয়া চাই",
  //   },
  //   {
  //     id: 42,
  //     name: "রব্বানা আতিনা মিন লাদুনকা রহমাতান",
  //     arabic: "رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً",
  //     transliteration: "Rabbana atina min ladunka rahmatan",
  //     meaning: "হে আমাদের রব, আপনার পক্ষ থেকে আমাদেরকে রহমত দান করুন",
  //   },
  //   {
  //     id: 43,
  //     name: "আল্লাহুম্মা রাব্বানাস সামাওয়াতি",
  //     arabic: "اللَّهُمَّ رَبَّ السَّمَاوَاتِ",
  //     transliteration: "Allahumma Rabbanas-samawati",
  //     meaning: "হে আল্লাহ, যিনি আসমানসমূহের রব",
  //   },
  //   {
  //     id: 44,
  //     name: "ইয়া রব্বাল আলামিন",
  //     arabic: "يَا رَبَّ الْعَالَمِينَ",
  //     transliteration: "Ya Rabbal-alamin",
  //     meaning: "হে বিশ্বজগতের রব",
  //   },
  //   {
  //     id: 45,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল জান্নাতা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ",
  //     transliteration: "Allahumma inni as'alukal jannata",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে জান্নাত চাই",
  //   },
  //   {
  //     id: 46,
  //     name: "আউজু বিকালিমাতিল্লাহিত তাম্মাতি",
  //     arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ",
  //     transliteration: "A'udhu bi kalimatillahit-tammati",
  //     meaning: "আমি আল্লাহর পরিপূর্ণ কালিমাসমূহের আশ্রয় নিচ্ছি",
  //   },
  //   {
  //     id: 47,
  //     name: "রব্বানা লা তুয়াখিজনা",
  //     arabic: "رَبَّنَا لَا تُؤَاخِذْنَا",
  //     transliteration: "Rabbana la tu'akhidhna",
  //     meaning: "হে আমাদের রব, আমাদেরকে পাকড়াও করবেন না",
  //   },
  //   {
  //     id: 48,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল আফওয়া",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ",
  //     transliteration: "Allahumma inni as'alukal afwa",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে ক্ষমা চাই",
  //   },
  //   {
  //     id: 49,
  //     name: "রব্বানা ফাগফিরলানা জুনুবানা",
  //     arabic: "رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا",
  //     transliteration: "Rabbana faghfir lana zunubana",
  //     meaning: "হে আমাদের রব, আমাদের পাপসমূহ ক্ষমা করুন",
  //   },
  //   {
  //     id: 50,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল মুআফাতা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْمُعَافَاةَ",
  //     transliteration: "Allahumma inni as'alukal mu'afata",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে নিরাপত্তা চাই",
  //   },
  //   {
  //     id: 51,
  //     name: "রব্বানা আমানা ফাগফিরলানা",
  //     arabic: "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا",
  //     transliteration: "Rabbana amanna faghfir lana",
  //     meaning: "হে আমাদের রব, আমরা ঈমান এনেছি, তাই আমাদের ক্ষমা করুন",
  //   },
  //   {
  //     id: 52,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাত তাওবাতা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ التَّوْبَةَ",
  //     transliteration: "Allahumma inni as'alukat tawbata",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে তওবা চাই",
  //   },
  //   {
  //     id: 53,
  //     name: "রব্বানা ওয়াজ আলনা মুসলিমায়নি",
  //     arabic: "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ",
  //     transliteration: "Rabbana waj'alna muslimayni",
  //     meaning: "হে আমাদের রব, আমাদেরকে মুসলিম হিসেবে তৈরি করুন",
  //   },
  //   {
  //     id: 54,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল হাসানাত",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْحَسَنَاتِ",
  //     transliteration: "Allahumma inni as'alukal hasanati",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে কল্যাণকর বিষয়সমূহ চাই",
  //   },
  //   {
  //     id: 55,
  //     name: "রব্বানা হাব লানা মিন আজওয়াজিনা",
  //     arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا",
  //     transliteration: "Rabbana hab lana min azwajina",
  //     meaning: "হে আমাদের রব, আমাদের স্ত্রীদের মধ্য থেকে আমাদেরকে দান করুন",
  //   },
  //   {
  //     id: 56,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইখলাসা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْإِخْلَاصَ",
  //     transliteration: "Allahumma inni as'alukal ikhlasa",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে ইখলাস চাই",
  //   },
  //   {
  //     id: 57,
  //     name: "রব্বানা আতিনা মিনাল জান্নাতি",
  //     arabic: "رَبَّنَا آتِنَا مِنَ الْجَنَّةِ",
  //     transliteration: "Rabbana atina minal jannati",
  //     meaning: "হে আমাদের রব, আমাদেরকে জান্নাত থেকে দান করুন",
  //   },
  //   {
  //     id: 58,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাশ শিফা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الشِّفَاءَ",
  //     transliteration: "Allahumma inni as'alukash shifa",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে শিফা চাই",
  //   },
  //   {
  //     id: 59,
  //     name: "রব্বানা লা তুজলিমনা",
  //     arabic: "رَبَّنَا لَا تُظْلِمْنَا",
  //     transliteration: "Rabbana la tuzlimna",
  //     meaning: "হে আমাদের রব, আমাদের উপর জুলুম করবেন না",
  //   },
  //   {
  //     id: 60,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল কাইমা",
  //     arabic: "اللَّهُمَّ إِنِّি أَسْأَلُكَ الْقَائِمَةَ",
  //     transliteration: "Allahumma inni as'alukal qa'imata",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে প্রতিষ্ঠিত থাকা চাই",
  //   },
  //   {
  //     id: 61,
  //     name: "রব্বানা ওয়াফিকনা মাআল আবরার",
  //     arabic: "رَبَّنَا وَفِّقْنَا مَعَ الْأَبْرَارِ",
  //     transliteration: "Rabbana waffiqna ma'al abrar",
  //     meaning: "হে আমাদের রব, আমাদেরকে সৎকর্মশীলদের সাথে মিলিত করুন",
  //   },
  //   {
  //     id: 62,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইমানা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْإِيمَانَ",
  //     transliteration: "Allahumma inni as'alukal imana",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে ঈমান চাই",
  //   },
  //   {
  //     id: 63,
  //     name: "রব্বানা ওয়াকফিনা মাশাররাল ফিতান",
  //     arabic: "رَبَّنَا وَقِفْنَا مَشَارَّ الْفِتَنِ",
  //     transliteration: "Rabbana waqifna masharrar fitan",
  //     meaning: "হে আমাদের রব, আমাদেরকে ফিতনার কিনারা থেকে রক্ষা করুন",
  //   },
  //   {
  //     id: 64,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহসানা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْإِحْسَانَ",
  //     transliteration: "Allahumma inni as'alukal ihsana",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে ইহসান চাই",
  //   },
  //   {
  //     id: 65,
  //     name: "রব্বানা ওয়ালা তুহাম্মিলনা মা লা তাকাতা লানা বিহি",
  //     arabic: "رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ",
  //     transliteration: "Rabbana wa la tuhammilna ma la taqata lana bihi",
  //     meaning:
  //       "হে আমাদের রব, আমাদের উপর এমন বোঝা চাপিয়ে দিবেন না যা বহন করার সামর্থ্য আমাদের নেই",
  //   },
  //   {
  //     id: 66,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইস্তিকামাতা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاسْتِقَامَةَ",
  //     transliteration: "Allahumma inni as'alukal istiqamata",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে সঠিক পথে অবিচল থাকা চাই",
  //   },
  //   {
  //     id: 67,
  //     name: "রব্বানা ওয়ালা তুসাক্কিত আলাইনা লাইনা",
  //     arabic: "رَبَّنَا وَلَا تُسَخِّطْ عَلَيْنَا لَيْنًا",
  //     transliteration: "Rabbana wa la tusakhit alayna laynan",
  //     meaning: "হে আমাদের রব, আমাদের উপর নরম হয়ে ক্রোধ করবেন না",
  //   },
  //   {
  //     id: 68,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইজাবাতা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْإِجَابَةَ",
  //     transliteration: "Allahumma inni as'alukal ijabata",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে দোয়া কবুল হওয়া চাই",
  //   },
  //   {
  //     id: 69,
  //     name: "রব্বানা ওয়ালা তাজআল ফি কুলুবিনা",
  //     arabic: "رَبَّنَا وَلَا تَجْعَلْ فِي قُلُوبِنَا",
  //     transliteration: "Rabbana wa la taj'al fi qulubina",
  //     meaning: "হে আমাদের রব, আমাদের অন্তরে (কোনো কুপ্রবৃত্তি) তৈরি করবেন না",
  //   },
  //   {
  //     id: 70,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইতকানা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْإِتْقَانَ",
  //     transliteration: "Allahumma inni as'alukal itqana",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে নিপুণতা চাই",
  //   },
  //   {
  //     id: 71,
  //     name: "রব্বানা ওয়ালা তুমিত্তনা গাফিলিনা",
  //     arabic: "رَبَّنَا وَلَا تُمِتَّنَا غَافِلِينَ",
  //     transliteration: "Rabbana wa la tumitna ghaflina",
  //     meaning: "হে আমাদের রব, আমাদেরকে গাফেল অবস্থায় মৃত্যু দিবেন না",
  //   },
  //   {
  //     id: 72,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিসাবা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاحْتِسَابَ",
  //     transliteration: "Allahumma inni as'alukal ihtisaba",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে সওয়াবের আশা চাই",
  //   },
  //   {
  //     id: 73,
  //     name: "রব্বানা ওয়ালা তাজআলনা মাআল কাওমিজ জালিমিন",
  //     arabic: "رَبَّنَا وَلَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
  //     transliteration: "Rabbana wa la taj'alna ma'al qawmiz zalimin",
  //     meaning: "হে আমাদের রব, আমাদেরকে জালিম সম্প্রদায়ের সাথে একত্র করবেন না",
  //   },
  //   {
  //     id: 74,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইখতিসামা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاخْتِصَامَ",
  //     transliteration: "Allahumma inni as'alukal ikhtisama",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে বিবাদের সমাপ্তি চাই",
  //   },
  //   {
  //     id: 75,
  //     name: "রব্বানা ওয়ালা তুজরিক আবসারানা",
  //     arabic: "رَبَّنَا وَلَا تُزِغْ أَبْصَارَنَا",
  //     transliteration: "Rabbana wa la tuzigh absarana",
  //     meaning: "হে আমাদের রব, আমাদের দৃষ্টিকে বাঁকা করবেন না",
  //   },
  //   {
  //     id: 76,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইজ্জাতা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعِزَّةَ",
  //     transliteration: "Allahumma inni as'alukal izzata",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে সম্মান চাই",
  //   },
  //   {
  //     id: 77,
  //     name: "রব্বানা ওয়ালা তাজআলনা ফিতনাতালিল্লাজিনা কাফারু",
  //     arabic: "رَبَّنَا وَلَا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ كَفَرُوا",
  //     transliteration: "Rabbana wa la taj'alna fitnatan lilladhina kafaru",
  //     meaning: "হে আমাদের রব, আমাদেরকে কাফিরদের জন্য ফিতনা বানাবেন না",
  //   },
  //   {
  //     id: 78,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইজতিহাদা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاجْتِهَادَ",
  //     transliteration: "Allahumma inni as'alukal ijtihada",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে চেষ্টা-সাধনার শক্তি চাই",
  //   },
  //   {
  //     id: 79,
  //     name: "রব্বানা ওয়াগফিরলানা ওয়ালি ইখওয়ানিনাল্লাজিনা সাবাকুনা বিল ইমান",
  //     arabic:
  //       "رَبَّنَا وَاغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ",
  //     transliteration:
  //       "Rabbana waghfir lana wa li-ikhwaninalladhina sabaquna bil-iman",
  //     meaning:
  //       "হে আমাদের রব, আমাদেরকে এবং আমাদের পূর্বে ঈমান আনা ভাইদেরকে ক্ষমা করুন",
  //   },
  //   {
  //     id: 80,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইজলালা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْإِجْلَالَ",
  //     transliteration: "Allahumma inni as'alukal ijlala",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে মর্যাদা চাই",
  //   },
  //   {
  //     id: 81,
  //     name: "রব্বানা ওয়ালা তাজআল ফি কুলুবিনা গিল্লান",
  //     arabic: "رَبَّنَا وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا",
  //     transliteration: "Rabbana wa la taj'al fi qulubina ghillan",
  //     meaning: "হে আমাদের রব, আমাদের অন্তরে বিদ্বেষ সৃষ্টি করবেন না",
  //   },
  //   {
  //     id: 82,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিমামা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاهْتِمَامَ",
  //     transliteration: "Allahumma inni as'alukal ihtimama",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে গুরুত্ব প্রদানের শক্তি চাই",
  //   },
  //   {
  //     id: 83,
  //     name: "রব্বানা ওয়ালা তুমাক্কিনা মিনাল কাওমিজ জালিমিন",
  //     arabic: "رَبَّنَا وَلَا تُمَكِّنَّا مِنَ الْقَوْمِ الظَّالِمِينَ",
  //     transliteration: "Rabbana wa la tumakkinna minal qawmiz zalimin",
  //     meaning:
  //       "হে আমাদের রব, আমাদেরকে জালিম সম্প্রদায়ের উপর কর্তৃত্ব দিবেন না",
  //   },
  //   {
  //     id: 84,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিরাজা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاحْتِرَازَ",
  //     transliteration: "Allahumma inni as'alukal ihtiraza",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে সতর্কতা চাই",
  //   },
  //   {
  //     id: 85,
  //     name: "রব্বানা ওয়ালা তুজলিমনা বিমা আমিলনা",
  //     arabic: "رَبَّنَا وَلَا تُظْلِمْنَا بِمَا عَمِلْنَا",
  //     transliteration: "Rabbana wa la tuzlimna bima amilna",
  //     meaning: "হে আমাদের রব, আমাদের আমলের কারণে আমাদের উপর জুলুম করবেন না",
  //   },
  //   {
  //     id: 86,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিদা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاهْتِدَاءَ",
  //     transliteration: "Allahumma inni as'alukal ihtida",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে হেদায়েত চাই",
  //   },
  //   {
  //     id: 87,
  //     name: "রব্বানা ওয়ালা তুশমিত বিনাল আসাইয়িনা",
  //     arabic: "رَبَّنَا وَلَا تُشْمِتْ بِنَا الْأَعْدَاءَ",
  //     transliteration: "Rabbana wa la tushmit binal a'da",
  //     meaning: "হে আমাদের রব, আমাদের দ্বারা শত্রুদের আনন্দিত করবেন না",
  //   },
  //   {
  //     id: 88,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিরামা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاحْتِرَامَ",
  //     transliteration: "Allahumma inni as'alukal ihtirama",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে সম্মান চাই",
  //   },
  //   {
  //     id: 89,
  //     name: "রব্বানা ওয়ালা তাজআলনা ফিতনাতালিল্লাজিনা আমানু",
  //     arabic: "رَبَّنَا وَلَا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ آمَنُوا",
  //     transliteration: "Rabbana wa la taj'alna fitnatan lilladhina amanu",
  //     meaning: "হে আমাদের রব, আমাদেরকে মুমিনদের জন্য ফিতনা বানাবেন না",
  //   },
  //   {
  //     id: 90,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিসারা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاحْتِصَارَ",
  //     transliteration: "Allahumma inni as'alukal ihtisara",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে সংকট থেকে মুক্তি চাই",
  //   },
  //   {
  //     id: 91,
  //     name: "রব্বানা ওয়ালা তুহজিরনা মাআল কাওমিল ফাসিকিন",
  //     arabic: "رَبَّنَا وَلَا تُحْشِرْنَا مَعَ الْقَوْمِ الْفَاسِقِينَ",
  //     transliteration: "Rabbana wa la tuhshirna ma'al qawmil fasikin",
  //     meaning: "হে আমাদের রব, আমাদেরকে ফাসেক সম্প্রদায়ের সাথে একত্র করবেন না",
  //   },
  //   {
  //     id: 92,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিদাদা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاحْتِدَادَ",
  //     transliteration: "Allahumma inni as'alukal ihtidad",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে সীমা নির্ধারণের শক্তি চাই",
  //   },
  //   {
  //     id: 93,
  //     name: "রব্বানা ওয়ালা তুমাসসিনা বিল আজাবি",
  //     arabic: "رَبَّنَا وَلَا تُمَسِّنَا بِالْعَذَابِ",
  //     transliteration: "Rabbana wa la tumassina bil azabi",
  //     meaning: "হে আমাদের রব, আমাদেরকে আযাব স্পর্শ করাবেন না",
  //   },
  //   {
  //     id: 94,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিমামা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاهْتِمَامَ",
  //     transliteration: "Allahumma inni as'alukal ihtimama",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে যত্নশীল হওয়ার শক্তি চাই",
  //   },
  //   {
  //     id: 95,
  //     name: "রব্বানা ওয়ালা তুজরিক আবসারানা",
  //     arabic: "رَبَّنَا وَلَا تُزِغْ أَبْصَارَنَا",
  //     transliteration: "Rabbana wa la tuzigh absarana",
  //     meaning: "হে আমাদের রব, আমাদের দৃষ্টিকে বাঁকা করবেন না",
  //   },
  //   {
  //     id: 96,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিরাজা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاحْتِرَازَ",
  //     transliteration: "Allahumma inni as'alukal ihtiraza",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে সতর্কতা চাই",
  //   },
  //   {
  //     id: 97,
  //     name: "রব্বানা ওয়ালা তুমাক্কিনা মিনাল কাওমিজ জালিমিন",
  //     arabic: "رَبَّنَا وَلَا تُمَكِّنَّا مِنَ الْقَوْمِ الظَّالِمِينَ",
  //     transliteration: "Rabbana wa la tumakkinna minal qawmiz zalimin",
  //     meaning:
  //       "হে আমাদের রব, আমাদেরকে জালিম সম্প্রদায়ের উপর কর্তৃত্ব দিবেন না",
  //   },
  //   {
  //     id: 98,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিদা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاهْتِدَاءَ",
  //     transliteration: "Allahumma inni as'alukal ihtida",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে হেদায়েত চাই",
  //   },
  //   {
  //     id: 99,
  //     name: "রব্বানা ওয়ালা তুশমিত বিনাল আসাইয়িনা",
  //     arabic: "رَبَّنَا وَلَا تُشْمِتْ بِنَا الْأَعْدَاءَ",
  //     transliteration: "Rabbana wa la tushmit binal a'da",
  //     meaning: "হে আমাদের রব, আমাদের দ্বারা শত্রুদের আনন্দিত করবেন না",
  //   },
  //   {
  //     id: 100,
  //     name: "আল্লাহুম্মা ইন্নি আসআলুকাল ইহতিরামা",
  //     arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الِاحْتِرَامَ",
  //     transliteration: "Allahumma inni as'alukal ihtirama",
  //     meaning: "হে আল্লাহ, আমি আপনার কাছে সম্মান চাই",
  //   },
  // ];

  // স্টেটে কাউন্টার ডেটা রাখা
  const [counters, setCounters] = useState({});

  // কম্পোনেন্ট মাউন্ট হলে লোকাল স্টোরেজ থেকে ডেটা লোড করা
  useEffect(() => {
    const savedCounters = JSON.parse(localStorage.getItem("duaCounters")) || {};
    setCounters(savedCounters);
  }, []);

  // কাউন্টার বাড়ানোর ফাংশন
  const incrementCounter = (duaId) => {
    const newCounters = {
      ...counters,
      [duaId]: (counters[duaId] || 0) + 1,
    };
    setCounters(newCounters);
    localStorage.setItem("duaCounters", JSON.stringify(newCounters));
  };

  // কাউন্টার রিসেট করার ফাংশন
  const resetCounter = (duaId) => {
    const newCounters = { ...counters };
    delete newCounters[duaId];
    setCounters(newCounters);
    localStorage.setItem("duaCounters", JSON.stringify(newCounters));
  };

  // সব কাউন্টার রিসেট করার ফাংশন
  const resetAllCounters = () => {
    setCounters({});
    localStorage.removeItem("duaCounters");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            দরুদ ও দোয়া কাউন্টার
          </h1>
          <p className="text-gray-600">প্রতিদিনের দরুদ ও দোয়ার হিসাব রাখুন</p>
        </header>

        <div className="flex justify-end mb-4">
          <button
            onClick={resetAllCounters}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            সব কাউন্টার রিসেট করুন
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {duas.map((dua) => (
            <div key={dua.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-green-700">
                    {dua.name}
                  </h2>
                  <p className="text-gray-600 mt-1">{dua.transliteration}</p>
                  <p className="text-gray-700 mt-2 mb-4">{dua.meaning}</p>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {counters[dua.id] || 0}
                </span>
              </div>

              <p className="text-right text-2xl mb-4 font-arabic text-black">
                {dua.arabic}
              </p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => incrementCounter(dua.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
                >
                  <span>+</span>
                  <span className="ml-2">বাড়ান</span>
                </button>

                <button
                  onClick={() => resetCounter(dua.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  রিসেট
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dua;
