export const CATEGORIES = [
  {
    id: 'quant',
    name: 'Quantitative Aptitude',
    icon: 'Calculator',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    description: 'Master Numbers, Percentages, Algebra, Geometry & Data Interpretation.',
    topics: ['Work & Time', 'Speed & Distance', 'Profit & Loss', 'Probability', 'Permutations & Combinations', 'Data Interpretation']
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    icon: 'Brain',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
    description: 'Enhance Puzzles, Blood Relations, Syllogisms & Pattern Recognition.',
    topics: ['Blood Relations', 'Syllogisms', 'Coding-Decoding', 'Series Completion', 'Seating Arrangements']
  },
  {
    id: 'verbal',
    name: 'Verbal Ability',
    icon: 'BookOpen',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    description: 'Sharpen Grammar, Vocabulary, Comprehension & Verbal Logic.',
    topics: ['Synonyms & Antonyms', 'Error Spotting', 'Sentence Completion', 'Reading Comprehension', 'Idioms & Phrases']
  },
  {
    id: 'technical',
    name: 'Technical & CS Aptitude',
    icon: 'Code2',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    description: 'Test Core Computer Science, Data Structures, Pseudo-code & OS Concepts.',
    topics: ['Data Structures', 'Time Complexity', 'Bit Manipulation', 'SQL & Databases', 'Networking Basics']
  }
];

export const FORMULA_SHEET = [
  {
    category: 'Work & Time',
    items: [
      { name: 'Combined Work Rate', formula: 'If A does work in X days & B in Y days, combined rate = 1/X + 1/Y. Time = (X * Y) / (X + Y)' },
      { name: 'Work & Efficiency', formula: 'Work = Efficiency × Time. If A is twice as efficient as B, Ratio of Time = 1 : 2' }
    ]
  },
  {
    category: 'Speed, Distance & Time',
    items: [
      { name: 'Average Speed', formula: 'Average Speed = Total Distance / Total Time. For equal distances at speeds A and B: 2AB / (A + B)' },
      { name: 'km/h to m/s conversion', formula: '1 km/h = 5/18 m/s | 1 m/s = 18/5 km/h' }
    ]
  },
  {
    category: 'Profit & Loss',
    items: [
      { name: 'Profit Percentage', formula: 'Profit % = [(Selling Price - Cost Price) / Cost Price] × 100' },
      { name: 'Discount Percentage', formula: 'Discount % = [(Marked Price - Selling Price) / Marked Price] × 100' }
    ]
  },
  {
    category: 'Probability & Combinatorics',
    items: [
      { name: 'Combination Formula', formula: 'nCr = n! / [r! × (n - r)!]' },
      { name: 'Probability of Event', formula: 'P(E) = Favorable Outcomes / Total Possible Outcomes' }
    ]
  }
];

export const QUESTIONS_BANK = [
  // --- QUANTITATIVE APTITUDE ---
  {
    id: 'q1',
    category: 'quant',
    topic: 'Work & Time',
    difficulty: 'Medium',
    question: 'A can complete a piece of work in 12 days, and B can complete the same work in 18 days. They start working together, but A leaves 3 days before the completion of the work. In how many total days was the work completed?',
    options: ['8.4 days', '9 days', '10 days', '7.5 days'],
    correctIndex: 1,
    formula: 'Work = Efficiency × Time',
    hint: 'Let total work be LCM(12, 18) = 36 units. Find their daily rates and work done in the final 3 days.',
    explanation: 'Step 1: Let Total Work = LCM(12, 18) = 36 units.\nStep 2: Efficiency of A = 36/12 = 3 units/day. Efficiency of B = 36/18 = 2 units/day.\nStep 3: In the last 3 days, A left, so only B worked. Work done by B in 3 days = 3 × 2 = 6 units.\nStep 4: Remaining work = 36 - 6 = 30 units.\nStep 5: Before A left, both worked together at rate (3 + 2) = 5 units/day.\nStep 6: Time spent together = 30 / 5 = 6 days.\nStep 7: Total time = 6 + 3 = 9 days.'
  },
  {
    id: 'q2',
    category: 'quant',
    topic: 'Speed & Distance',
    difficulty: 'Hard',
    question: 'Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively, and they cross each other in 23 seconds. What is the ratio of their speeds?',
    options: ['3 : 2', '1 : 3', '3 : 4', '2 : 1'],
    correctIndex: 0,
    formula: 'Distance = Speed × Time',
    hint: 'Let the speeds of the two trains be S1 and S2. Express their lengths in terms of speeds and time.',
    explanation: 'Step 1: Length of 1st train L1 = 27 × S1. Length of 2nd train L2 = 17 × S2.\nStep 2: When crossing each other in opposite directions, relative speed = S1 + S2.\nStep 3: Total distance = L1 + L2 = 27S1 + 17S2.\nStep 4: Time taken = (27S1 + 17S2) / (S1 + S2) = 23.\nStep 5: Cross-multiply: 27S1 + 17S2 = 23S1 + 23S2 ⇒ 4S1 = 6S2 ⇒ S1 / S2 = 6 / 4 = 3 / 2.'
  },
  {
    id: 'q3',
    category: 'quant',
    topic: 'Profit & Loss',
    difficulty: 'Easy',
    question: 'A merchant buys a item for $80 and sells it for $100 after giving a discount of 20% on the marked price. What was the marked price of the item?',
    options: ['$120', '$125', '$115', '$130'],
    correctIndex: 1,
    formula: 'Selling Price = Marked Price × (100 - Discount%)/100',
    hint: 'Selling price is $100 after 20% discount on Marked Price (MP). So 80% of MP = 100.',
    explanation: 'Step 1: SP = $100.\nStep 2: SP = MP × (1 - 0.20) = 0.8 × MP.\nStep 3: 0.8 × MP = 100 ⇒ MP = 100 / 0.8 = $125.'
  },
  {
    id: 'q4',
    category: 'quant',
    topic: 'Probability',
    difficulty: 'Medium',
    question: 'Three fair coins are tossed simultaneously. What is the probability of getting at least two heads?',
    options: ['1/2', '3/8', '5/8', '3/4'],
    correctIndex: 0,
    formula: 'P(E) = Favorable Outcomes / Total Outcomes',
    hint: 'Total outcomes for 3 coins = 2^3 = 8. Count outcomes with 2 or 3 heads.',
    explanation: 'Step 1: Sample space = {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT}. Total = 8.\nStep 2: Outcomes with at least 2 heads = {HHH, HHT, HTH, THH}. Favorable = 4.\nStep 3: P(at least 2 heads) = 4 / 8 = 1/2.'
  },
  {
    id: 'q5',
    category: 'quant',
    topic: 'Data Interpretation',
    difficulty: 'Medium',
    question: 'Based on the sales data table below, what is the percentage growth in Total Revenue from Q1 to Q4?',
    tableData: [
      { quarter: 'Q1', productA: 120, productB: 80 },
      { quarter: 'Q2', productA: 150, productB: 90 },
      { quarter: 'Q3', productA: 180, productB: 110 },
      { quarter: 'Q4', productA: 200, productB: 150 }
    ],
    options: ['75%', '60%', '85%', '70%'],
    correctIndex: 0,
    formula: '% Growth = [(Final - Initial) / Initial] × 100',
    hint: 'Calculate total revenue for Q1 (Product A + B) and Q4 (Product A + B).',
    explanation: 'Step 1: Q1 Total Revenue = 120 + 80 = 200.\nStep 2: Q4 Total Revenue = 200 + 150 = 350.\nStep 3: Growth = 350 - 200 = 150.\nStep 4: % Growth = (150 / 200) × 100 = 75%.'
  },
  {
    id: 'q6',
    category: 'quant',
    topic: 'Permutations & Combinations',
    difficulty: 'Hard',
    question: 'In how many different ways can the letters of the word "LEADING" be arranged such that the vowels always come together?',
    options: ['720', '360', '5040', '1440'],
    correctIndex: 0,
    formula: 'Total Arrangements = Group Arrangement × Internal Vowel Arrangements',
    hint: 'Treat all vowels (E, A, I) as a single group unit.',
    explanation: 'Step 1: Word = LEADING (7 letters). Vowels = E, A, I (3 vowels), Consonants = L, D, N, G (4 consonants).\nStep 2: Treat 3 vowels as 1 single block. Total units to arrange = 4 consonants + 1 block = 5 units.\nStep 3: 5 units can be arranged in 5! = 120 ways.\nStep 4: The 3 vowels within the block can be arranged among themselves in 3! = 6 ways.\nStep 5: Total ways = 5! × 3! = 120 × 6 = 720 ways.'
  },

  // --- LOGICAL REASONING ---
  {
    id: 'q7',
    category: 'logical',
    topic: 'Blood Relations',
    difficulty: 'Medium',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: ['Brother', 'Uncle', 'Father', 'Grandfather'],
    correctIndex: 2,
    formula: 'Family Tree Mapping',
    hint: 'Break down "mother\'s only son". Who is the only son of Suresh\'s mother?',
    explanation: 'Step 1: "My mother\'s only son" = Suresh himself (since he is male and speaking).\nStep 2: "He is the son of [Suresh]" ⇒ The boy in the photo is Suresh\'s son.\nStep 3: Therefore, Suresh is the Father of the boy.'
  },
  {
    id: 'q8',
    category: 'logical',
    topic: 'Syllogisms',
    difficulty: 'Medium',
    question: 'Statements:\n1. All cars are vehicles.\n2. Some vehicles are electric.\n\nConclusions:\nI. Some cars are electric.\nII. All electric items are vehicles.\nWhich conclusion(s) logically follow?',
    options: ['Only Conclusion I follows', 'Only Conclusion II follows', 'Either I or II follows', 'Neither Conclusion I nor II follows'],
    correctIndex: 3,
    formula: 'Venn Diagram Deduction',
    hint: 'Draw Venn diagrams. Does the circle of electric cars necessarily overlap with cars?',
    explanation: 'Step 1: Statement 1 puts Cars inside Vehicles.\nStep 2: Statement 2 overlaps Electric with Vehicles, but it does NOT guarantee overlap with Cars. Thus Conclusion I is uncertain.\nStep 3: Statement 2 says "Some vehicles are electric", which does NOT imply "All electric items are vehicles" (Conclusion II is an over-generalization).\nStep 4: Hence, neither conclusion logically follows with certainty.'
  },
  {
    id: 'q9',
    category: 'logical',
    topic: 'Series Completion',
    difficulty: 'Easy',
    question: 'Find the missing number in the sequence: 7, 10, 8, 11, 9, 12, ___',
    options: ['7', '10', '12', '13'],
    correctIndex: 1,
    formula: 'Alternating Operations (+3, -2)',
    hint: 'Observe the pattern between consecutive terms: +3 then -2 then +3 then -2...',
    explanation: 'Step 1: 7 + 3 = 10\nStep 2: 10 - 2 = 8\nStep 3: 8 + 3 = 11\nStep 4: 11 - 2 = 9\nStep 5: 9 + 3 = 12\nStep 6: Next term = 12 - 2 = 10.'
  },
  {
    id: 'q10',
    category: 'logical',
    topic: 'Coding-Decoding',
    difficulty: 'Easy',
    question: 'If "COMPUTER" is coded as "RFUVQNPC", how is "MEDICINE" coded in that same language?',
    options: ['EOJDEJFM', 'MFEJDJOE', 'EOJDJEFM', 'EOJDEJME'],
    correctIndex: 0,
    formula: 'Reverse & Alphabetic Shift (+1)',
    hint: 'Notice the first and last letters of COMPUTER (C & R) are swapped to R & C. What happens to inner letters?',
    explanation: 'Step 1: Reverse the word: RETUPMOC.\nStep 2: Keep the 1st and last letters same (R and C).\nStep 3: Increment inner letters by +1: E->F, T->U, U->V, P->Q, M->N, O->P.\nStep 4: Applying same logic to MEDICINE:\nReverse = ENICIDEM.\nKeep 1st (E) and last (M).\nInner letters shifted by +1: N->O, I->J, C->D, I->J, D->E, E->F.\nResult = E O J D J E F M.'
  },
  {
    id: 'q11',
    category: 'logical',
    topic: 'Seating Arrangements',
    difficulty: 'Hard',
    question: 'A, B, C, D, E, and F are sitting in a circle facing the center. A is sitting second to the left of F. C is not an immediate neighbor of F. B is sitting third to the right of A. Who is sitting directly opposite to A?',
    options: ['B', 'D', 'E', 'C'],
    correctIndex: 0,
    formula: 'Circular Arrangement Position Rules',
    hint: 'In a circle of 6 people, "third to the right/left" means directly opposite.',
    explanation: 'Step 1: Place F at position 1. A is 2nd to the left of F ⇒ A is at position 5.\nStep 2: B is 3rd to the right of A (1, 2, 3 steps clockwise from pos 5 = pos 2).\nStep 3: In a 6-person circle, position 2 is exactly opposite to position 5 (A).\nStep 4: Thus, B is sitting directly opposite to A.'
  },

  // --- VERBAL ABILITY ---
  {
    id: 'q12',
    category: 'verbal',
    topic: 'Synonyms & Antonyms',
    difficulty: 'Easy',
    question: 'Choose the word that is most SIMILAR in meaning (Synonym) to "EPHEMERAL":',
    options: ['Eternal', 'Transient', 'Permanent', 'Substantial'],
    correctIndex: 1,
    formula: 'Vocabulary Analysis',
    hint: '"Ephemeral" describes something that lasts for a very short duration.',
    explanation: 'Step 1: Ephemeral means lasting for a very short time, fleeting.\nStep 2: "Transient" means lasting only for a short time (synonym).\nStep 3: Eternal and Permanent are antonyms.'
  },
  {
    id: 'q13',
    category: 'verbal',
    topic: 'Error Spotting',
    difficulty: 'Medium',
    question: 'Identify the part of the sentence containing a grammatical error:\n"Neither the manager nor his assistants (A) / was available (B) / to address the client\'s urgency (C) / during the meeting (D)."',
    options: ['Part (A)', 'Part (B)', 'Part (C)', 'No Error'],
    correctIndex: 1,
    formula: 'Subject-Verb Agreement with Neither...Nor',
    hint: 'When two subjects are joined by "neither...nor", the verb agrees with the subject closest to it ("assistants").',
    explanation: 'Step 1: The subject closer to the verb is plural ("his assistants").\nStep 2: Therefore, the verb should be plural ("were available") instead of singular ("was available").\nStep 3: The error is in Part (B).'
  },
  {
    id: 'q14',
    category: 'verbal',
    topic: 'Reading Comprehension',
    difficulty: 'Medium',
    question: 'Passage: "Artificial Intelligence does not replace human ingenuity; rather, it amplifies human capacity by automating routine computational tasks, enabling creators to focus on high-level strategic reasoning and empathy-driven decision making."\n\nAccording to the passage, what is the primary benefit of AI?',
    options: [
      'Replacing human workers entirely',
      'Automating all human decision-making',
      'Frees humans to focus on strategy and empathy by handling routine tasks',
      'Eliminating the need for computational tools'
    ],
    correctIndex: 2,
    formula: 'Passage Synthesis',
    hint: 'Focus on what AI amplifies and allows creators to do.',
    explanation: 'Step 1: The passage explicitly states AI "amplifies human capacity by automating routine computational tasks, enabling creators to focus on high-level strategic reasoning and empathy-driven decision making."\nStep 2: Option 3 directly captures this main thesis.'
  },
  {
    id: 'q15',
    category: 'verbal',
    topic: 'Idioms & Phrases',
    difficulty: 'Easy',
    question: 'What is the meaning of the idiom "To burn the midnight oil"?',
    options: [
      'To waste electrical energy',
      'To work or study late into the night',
      'To set something on fire accidentally',
      'To take unnecessary risks'
    ],
    correctIndex: 1,
    formula: 'Idiom Definition',
    hint: 'Refers to using oil lamps to work when it is dark outside.',
    explanation: 'Step 1: "Burn the midnight oil" historically meant reading or working by the light of an oil lamp late at night.\nStep 2: It signifies working late into the night.'
  },

  // --- TECHNICAL & CS APTITUDE ---
  {
    id: 'q16',
    category: 'technical',
    topic: 'Time Complexity',
    difficulty: 'Medium',
    question: 'What is the worst-case time complexity of QuickSort when bad pivot selection occurs (e.g. sorted array with first element as pivot)?',
    options: ['O(N log N)', 'O(N)', 'O(N²)', 'O(log N)'],
    correctIndex: 2,
    formula: 'Recurrence: T(N) = T(N-1) + O(N)',
    hint: 'In the worst case, each partition divides the array into 0 and N-1 elements.',
    explanation: 'Step 1: If pivot selection consistently chooses the smallest or largest element, array splits into (0) and (N-1) items.\nStep 2: Recurrence relation becomes T(N) = T(N-1) + O(N).\nStep 3: Solving the summation 1 + 2 + 3 + ... + N yields O(N²).'
  },
  {
    id: 'q17',
    category: 'technical',
    topic: 'Data Structures',
    difficulty: 'Medium',
    question: 'What output will the following snippet print?',
    codeSnippet: `let stack = [];
stack.push(10);
stack.push(20);
stack.push(30);
stack.pop();
stack.push(40);
console.log(stack[stack.length - 1]);`,
    options: ['20', '30', '40', '10'],
    correctIndex: 2,
    formula: 'LIFO (Last In First Out)',
    hint: 'Trace the stack operations: push 10, push 20, push 30, pop 30, push 40.',
    explanation: 'Step 1: Stack after push(10), push(20), push(30): [10, 20, 30].\nStep 2: pop() removes top element 30. Stack becomes [10, 20].\nStep 3: push(40) adds 40. Stack becomes [10, 20, 40].\nStep 4: Top element stack[stack.length - 1] is 40.'
  },
  {
    id: 'q18',
    category: 'technical',
    topic: 'Bit Manipulation',
    difficulty: 'Hard',
    question: 'What is the value of expression `(X & (X - 1))` when `X = 12` (represented in binary as `1100`)?',
    options: ['8 (1000₂)', '4 (0100₂)', '12 (1100₂)', '0 (0000₂)'],
    correctIndex: 0,
    formula: 'Bitwise trick: X & (X - 1) turns off lowest set bit',
    hint: '12 in binary is 1100. 11 in binary is 1011. Perform bitwise AND.',
    explanation: 'Step 1: X = 12 = 1100₂.\nStep 2: X - 1 = 11 = 1011₂.\nStep 3: Perform Bitwise AND:\n  1100\n& 1011\n------\n  1000 (which is 8 in decimal).\nStep 4: Note: `X & (X - 1)` clears the lowest set bit in binary representation!'
  },
  {
    id: 'q19',
    category: 'technical',
    topic: 'SQL & Databases',
    difficulty: 'Easy',
    question: 'Which SQL clause is used to filter group results AFTER an aggregate function (e.g. GROUP BY) has been applied?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
    correctIndex: 1,
    formula: 'SQL Execution Order',
    hint: 'WHERE filters rows BEFORE grouping; which clause filters groups AFTER aggregation?',
    explanation: 'Step 1: `WHERE` filters individual records before aggregation.\nStep 2: `HAVING` is specifically designed to filter groups formed by `GROUP BY` based on aggregate criteria (e.g., `HAVING COUNT(*) > 5`).'
  },
  {
    id: 'q20',
    category: 'technical',
    topic: 'Networking Basics',
    difficulty: 'Medium',
    question: 'At which OSI layer does the IP (Internet Protocol) operate?',
    options: ['Data Link Layer (Layer 2)', 'Network Layer (Layer 3)', 'Transport Layer (Layer 4)', 'Application Layer (Layer 7)'],
    correctIndex: 1,
    formula: 'OSI 7-Layer Model',
    hint: 'IP routing and logical IP addressing happen at layer 3.',
    explanation: 'Step 1: Layer 1 = Physical, Layer 2 = Data Link (MAC), Layer 3 = Network (IP addresses & routing), Layer 4 = Transport (TCP/UDP).\nStep 2: Thus, IP operates at Layer 3 (Network Layer).'
  }
];
