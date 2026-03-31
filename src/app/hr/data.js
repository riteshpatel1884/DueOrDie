// STAR Interview Questions — 30 Behavioural & Situational Questions for Fresh Engineers
// Structure: { id, category, categoryEmoji, categoryColor, question, situation, task, action, result, tags }

export const STAR_CATEGORIES = [
  {
    id: "teamwork",
    label: "Teamwork & Collaboration",

    color: "#3b82f6",
  },
  {
    id: "problem-solving",
    label: "Problem-Solving & Critical Thinking",

    color: "#8b5cf6",
  },
  {
    id: "time-management",
    label: "Time Management & Prioritization",

    color: "#f59e0b",
  },
  {
    id: "communication",
    label: "Communication & Presentation",

    color: "#10b981",
  },
  {
    id: "learning",
    label: "Learning & Adaptability",

    color: "#06b6d4",
  },
  {
    id: "initiative",
    label: "Initiative & Leadership",

    color: "#f97316",
  },
];

export const STAR_QUESTIONS = [
  // ── Section 1: Teamwork & Collaboration ─────────────────────────────────────
  {
    id: 1,
    category: "teamwork",

    categoryLabel: "Teamwork & Collaboration",
    categoryColor: "#3b82f6",
    title: "Conflicting Approaches",
    question:
      "During a group project, your teammate insists on using a technology you've never used, while you believe your approach is more practical. Describe how you handled the disagreement.",
    tags: ["conflict resolution", "technical decision", "compromise"],
    situation:
      "During my final-year capstone project, my teammate wanted to use GraphQL for our API layer, while I believed REST was the more practical choice given our tight 3-week timeline and the team's existing familiarity with REST.",
    task: "I needed to resolve the technical disagreement constructively without damaging team morale, while still ensuring we made the best technical decision for the project's success.",
    action:
      "I suggested we each spend 30 minutes preparing a brief pros-and-cons list for both approaches, then present our cases to the group. I acknowledged my teammate's point that GraphQL offered better flexibility for future features, but highlighted that REST would reduce our learning curve and risk given the deadline. We compromised: we used REST for the core API and I committed to learning GraphQL basics, agreeing it would be considered for the next sprint.",
    result:
      "We delivered the project on time with full functionality. More importantly, I learned GraphQL over the following week and we did implement it for one endpoint as a stretch goal. The disagreement actually strengthened our team dynamic by establishing a culture of evidence-based decision making.",
  },
  {
    id: 2,
    category: "teamwork",

    categoryLabel: "Teamwork & Collaboration",
    categoryColor: "#3b82f6",
    title: "Underperforming Team Member",
    question:
      "You noticed a teammate was consistently missing deadlines and affecting the group's progress. Walk me through how you addressed it.",
    tags: ["empathy", "team dynamics", "leadership"],
    situation:
      "In a software engineering group project, one of our four members missed two consecutive sprint deadlines for the authentication module. The rest of the team was getting frustrated, and our delivery timeline was at risk.",
    task: "As the informal team lead for that sprint, I was responsible for ensuring we stayed on track. I needed to address the issue without damaging team morale or publicly humiliating my teammate.",
    action:
      "I requested a one-on-one coffee chat with the teammate, framing it as a check-in rather than a confrontation. I learned they were dealing with a family situation and were overwhelmed. Together, we broke down their remaining tasks into smaller daily subtasks. I also paired them with another teammate for co-working sessions and took on one of their smaller tasks myself to ease the load.",
    result:
      "The teammate completed their revised tasks by the next sprint. They later told me that conversation was the turning point. We submitted the project on time with all core features implemented. I also gained experience in empathetic leadership, which I now consider one of my most important non-technical skills.",
  },
  {
    id: 3,
    category: "teamwork",

    categoryLabel: "Teamwork & Collaboration",
    categoryColor: "#3b82f6",
    title: "Last-Minute Absence",
    question:
      "A key team member dropped out of a project presentation the night before. How did you respond?",
    tags: ["crisis management", "adaptability", "presentation"],
    situation:
      "The night before our database systems final presentation, one teammate informed us they had a medical emergency and could not attend. They were responsible for presenting two of our five sections, including the technical architecture demo.",
    task: "Our group needed to redistribute the presentation content and ensure we could confidently cover their sections without significantly degrading the quality of our presentation.",
    action:
      "I called an emergency one-hour video call with the remaining three members. We divided the absent teammate's slides among ourselves, spending 20 minutes each reviewing and rehearsing the new material. I personally took on the technical demo section since I was most familiar with the architecture. I also prepared a brief note to the professor explaining the situation, which our team agreed to submit at the start of class.",
    result:
      "The presentation went smoothly. The professor appreciated our transparency and professionalism, and we scored 87 out of 100. The experience taught me the value of ensuring every team member has shared knowledge of the full project, not just their own section.",
  },
  {
    id: 4,
    category: "teamwork",

    categoryLabel: "Teamwork & Collaboration",
    categoryColor: "#3b82f6",
    title: "Remote Collaboration",
    question:
      "You had to collaborate with classmates across different time zones on a capstone project. How did you manage coordination?",
    tags: ["remote work", "async communication", "coordination"],
    situation:
      "For a global engineering challenge organized by my university, I was grouped with students from Canada, India, and Germany. We had a 10-week project with a 9-hour maximum time zone difference between team members.",
    task: "I volunteered to manage our coordination strategy and needed to find a workflow that allowed all four members to contribute fairly despite the time zone constraints.",
    action:
      "I proposed an asynchronous-first approach: we used GitHub for code with detailed PR descriptions, a shared Notion workspace for documentation, and Loom for video updates instead of requiring everyone to be live. We scheduled one weekly 30-minute overlap call during a window that worked for all time zones. I created a shared task board with 48-hour turnaround expectations so no one was blocked waiting for a response.",
    result:
      "We delivered a complete prototype on time and won second place in our regional division. All four team members rated the collaboration experience positively in our retrospective. The experience gave me practical skills in async communication and documentation that are directly applicable to remote engineering roles.",
  },
  {
    id: 5,
    category: "teamwork",

    categoryLabel: "Teamwork & Collaboration",
    categoryColor: "#3b82f6",
    title: "Unequal Workload",
    question:
      "You realized you were carrying most of the workload in a group assignment while others contributed little. What did you do?",
    tags: ["accountability", "communication", "fairness"],
    situation:
      "In a third-year systems programming course, our group of three was building a memory allocator. By the halfway point, I had completed approximately 70% of the work while my two teammates had each contributed minimal effort, mostly due to a lack of urgency on their end.",
    task: "I needed to address the imbalance in a way that re-engaged my teammates, protected the quality of our submission, and avoided resentment that could affect our working relationship for the rest of the semester.",
    action:
      "Rather than complaining to the professor or doing everything myself, I organized a team meeting and transparently shared a task breakdown showing what had been done and what remained. I asked each teammate to claim specific incomplete tasks with self-set deadlines. I also framed it positively: I told them I was confident we could all finish strong together. I followed up daily with a brief Slack check-in.",
    result:
      "Both teammates became more engaged and completed their assigned portions. We submitted a fully functional project and received a B+. I also learned to set clear expectations and divide tasks explicitly at the start of future projects, which prevented similar situations from arising.",
  },

  // ── Section 2: Problem-Solving & Critical Thinking ──────────────────────────
  {
    id: 6,
    category: "problem-solving",

    categoryLabel: "Problem-Solving & Critical Thinking",
    categoryColor: "#8b5cf6",
    title: "Bug Under Pressure",
    question:
      "You had a critical bug in your code hours before a project submission. Walk me through how you diagnosed and fixed it.",
    tags: ["debugging", "concurrency", "systematic thinking"],
    situation:
      "Three hours before submitting my operating systems assignment, a race condition in my thread synchronization code caused unpredictable crashes that did not appear in my earlier unit tests.",
    task: "I needed to diagnose and fix a non-deterministic, concurrency-related bug under extreme time pressure without breaking the parts of the code that were already working.",
    action:
      "I resisted the urge to randomly edit code and instead used a systematic approach. First, I reproduced the bug consistently by increasing the thread count. Then I added targeted logging to isolate which function was failing. I identified that two threads were accessing a shared counter without a lock. After adding a mutex, I ran the test suite 10 consecutive times to verify the fix was stable rather than masking the issue.",
    result:
      "The bug was fixed with 90 minutes to spare. I submitted successfully and received full marks for correctness. More importantly, I internalized the debugging principle of reproducing before fixing and never again submit code without stress-testing concurrent paths.",
  },
  {
    id: 7,
    category: "problem-solving",

    categoryLabel: "Problem-Solving & Critical Thinking",
    categoryColor: "#8b5cf6",
    title: "Unclear Requirements",
    question:
      "You were given a project with vague specifications and no clear direction. How did you approach it?",
    tags: ["requirements", "initiative", "scoping"],
    situation:
      'In my software design course, we were given a one-paragraph brief asking us to "build a useful web tool for students" with no further specifications on features, tech stack, or scope.',
    task: "Rather than waiting for more direction or building something arbitrary, I needed to define a clear, achievable scope and justify my design decisions through evidence.",
    action:
      "I started by identifying the problem space: I surveyed 15 fellow students in 10 minutes using a quick Google Form to understand their biggest pain points. Based on responses, I scoped the project to a course deadline tracker with calendar integration. I wrote a one-page project definition document outlining the problem statement, target user, core features, and technical constraints, then shared it with my professor for a quick email confirmation before starting development.",
    result:
      "The professor praised my initiative and methodology in the final presentation feedback. I built and delivered a working app on time and received the top grade in the class. This experience taught me that clarifying requirements is itself an engineering skill, not a luxury.",
  },
  {
    id: 8,
    category: "problem-solving",

    categoryLabel: "Problem-Solving & Critical Thinking",
    categoryColor: "#8b5cf6",
    title: "Resource Constraints",
    question:
      "You had to complete a technical project with limited tools, time, or hardware. How did you manage?",
    tags: ["resourcefulness", "planning", "hardware"],
    situation:
      "For an embedded systems project, our team needed to prototype a sensor data logger but our department had only two Arduino units available, and our team had four members with a two-week deadline.",
    task: "I needed to design a development workflow that allowed four people to make meaningful progress despite having only half the required hardware.",
    action:
      "I mapped our tasks into hardware-dependent and hardware-independent categories. Two members worked in parallel on software simulation using Wokwi, while the other two used the physical Arduinos for hardware validation. I created a shared hardware sign-up schedule so the boards were never idle. I also pushed for us to finalize and freeze the hardware wiring early so we minimized back-and-forth.",
    result:
      "We completed both hardware and software integration ahead of schedule, with two days to spare for testing. Our approach was highlighted by the professor as an example of resource-aware engineering. The project scored 91%. I also gained familiarity with hardware simulation tools I continue to use today.",
  },
  {
    id: 9,
    category: "problem-solving",

    categoryLabel: "Problem-Solving & Critical Thinking",
    categoryColor: "#8b5cf6",
    title: "Unexpected Failure",
    question:
      "Your project worked perfectly in testing but failed during the final demo. What did you do?",
    tags: ["composure", "live demo", "problem diagnosis"],
    situation:
      "During the live demo of my machine learning course project, the model that had achieved 92% accuracy in testing began producing wildly incorrect outputs in front of the professor and 30 classmates.",
    task: "I needed to respond professionally and analytically in real time, preserving my credibility and demonstrating engineering maturity despite the failure.",
    action:
      "I stayed calm and narrated my thought process aloud rather than going silent or panicking. I explained that the demo environment likely differed from my training environment and hypothesized it could be a data normalization issue. I showed my pre-prepared slides documenting the successful test results and walked through my methodology instead. After class, I investigated and confirmed: the demo machine had a different Python library version that changed default normalization behavior.",
    result:
      "The professor acknowledged my composure and analytical response, and allowed me to resubmit a video demo the following day. My final grade was not significantly impacted. More importantly, I now always containerize my environments using Docker before any live demonstration.",
  },
  {
    id: 10,
    category: "problem-solving",

    categoryLabel: "Problem-Solving & Critical Thinking",
    categoryColor: "#8b5cf6",
    title: "Novel Problem",
    question:
      "You encountered a technical problem you had no prior knowledge about. How did you go about solving it?",
    tags: ["self-learning", "hackathon", "WebSockets"],
    situation:
      "During a hackathon, my team decided to implement WebSockets for real-time communication in our app. I was the only backend developer on the team and had never worked with WebSockets before.",
    task: "I needed to learn a new technology, implement a working solution, and integrate it with our existing REST API, all within a 24-hour hackathon window.",
    action:
      "I allocated the first 45 minutes to structured learning: I read the official WebSocket RFC summary, watched one 15-minute tutorial, and studied one open-source example project. I then built the smallest possible proof-of-concept first to verify my understanding before integrating it into our main app. I documented each step as I went so my teammates could understand the code if I got stuck.",
    result:
      "Our real-time chat feature was fully functional by hour 18 of the hackathon. The judges specifically praised the real-time feature as technically impressive for a hackathon project. My takeaway was a repeatable framework for learning unfamiliar technologies under time constraints: minimal viable learning, then proof-of-concept, then integration.",
  },

  // ── Section 3: Time Management & Prioritization ──────────────────────────────
  {
    id: 11,
    category: "time-management",

    categoryLabel: "Time Management & Prioritization",
    categoryColor: "#f59e0b",
    title: "Competing Deadlines",
    question:
      "You had two major deliverables due at the same time — an exam and a project submission. How did you handle it?",
    tags: ["prioritization", "planning", "stress management"],
    situation:
      "During my third year, I had a final exam in Algorithms and a full software project submission due within 24 hours of each other during exam week.",
    task: "I needed to perform well on both without sacrificing either, while managing significant stress and avoiding the trap of neglecting one in favor of the other.",
    action:
      "Two weeks out, I created a prioritized study and development schedule, working backward from both deadlines. I identified which project features were must-haves versus nice-to-haves and deliberately descoped two lower-priority features early. For exam prep, I focused on past papers rather than re-reading notes. I also blocked specific 90-minute deep work sessions and protected my sleep schedule, knowing fatigue would hurt both outcomes.",
    result:
      "I scored 78% on the exam and received full marks on the project's core requirements. The deliberate descoping decision was validated when my professor mentioned the two features I cut were not evaluated anyway. I now apply the same backward-planning approach to every semester.",
  },
  {
    id: 12,
    category: "time-management",

    categoryLabel: "Time Management & Prioritization",
    categoryColor: "#f59e0b",
    title: "Scope Creep",
    question:
      "Your project kept growing in scope as new features were added. How did you manage your time and still deliver?",
    tags: ["scope management", "process", "delivery"],
    situation:
      "Midway through a semester-long web development project, my team kept adding feature ideas to our backlog after every weekly meeting, growing from 5 core features to over 20 in three weeks.",
    task: "I needed to protect our delivery timeline while still accommodating the team's creative energy and legitimate improvement ideas.",
    action:
      'I introduced a lightweight change control process: any new feature idea had to be written on a shared board with an estimated effort tag. At the start of each week, the team voted on whether any new item displaced something existing in scope. I also created a clear "v1" versus "future" column to give ideas a home without committing to them. This made it easier for teammates to feel heard without automatically expanding our workload.',
    result:
      "We delivered all five original core features on time with two bonus features that genuinely improved the product. Post-submission, we had a well-organized backlog of 14 ideas ready for a hypothetical v2. The professor used our change management process as an example for the rest of the class.",
  },
  {
    id: 13,
    category: "time-management",

    categoryLabel: "Time Management & Prioritization",
    categoryColor: "#f59e0b",
    title: "Underestimated Task",
    question:
      "You underestimated how long a task would take and realized mid-way you wouldn't finish on time. What did you do?",
    tags: ["estimation", "communication", "trade-offs"],
    situation:
      "I underestimated the complexity of implementing a search feature for my backend engineering assignment, initially expecting it to take 4 hours. Halfway through, I realized it would take closer to 12 hours due to indexing challenges I had not anticipated.",
    task: "I needed to either find a way to accelerate my progress or transparently communicate the risk to my team so we could collectively adjust our plan.",
    action:
      "First, I identified which aspects of the search feature were essential for the demo versus cosmetic. I simplified the implementation by using a simpler in-memory search instead of the optimized indexed approach I had originally planned. I then notified my team immediately, explaining the trade-off so they could adjust integration timelines. I documented the simplified approach in the code with a TODO note explaining the more robust path forward.",
    result:
      "The simplified feature was completed on time and worked correctly for the demo. My team appreciated the early communication rather than a last-minute surprise. The professor accepted the trade-off as a valid engineering decision. I now build in a 30% time buffer for any task involving technology I have not used before.",
  },
  {
    id: 14,
    category: "time-management",

    categoryLabel: "Time Management & Prioritization",
    categoryColor: "#f59e0b",
    title: "Procrastination Recovery",
    question:
      "You fell behind on a long-term assignment due to other commitments. How did you catch up?",
    tags: ["recovery", "discipline", "planning"],
    situation:
      "During a busy mid-semester period, I fell three weeks behind on a research report for my engineering ethics course due to prioritizing lab work and extracurricular commitments.",
    task: "With two weeks remaining and roughly five weeks of work to compress, I needed a recovery plan that was realistic enough to actually execute without burning out.",
    action:
      "I did an honest audit of my remaining time and the minimum viable output required for a passing grade. I broke the remaining work into two-hour daily blocks and committed to a no-exceptions rule for those sessions. I dropped two non-essential social commitments for two weeks and asked a classmate to serve as an accountability partner, sending them my daily progress via a quick message.",
    result:
      "I submitted the report on time and received a grade of 73%, which I was genuinely satisfied with given the circumstances. More significantly, I implemented a weekly review habit after that experience, checking in on long-term projects every Sunday to prevent the same situation from recurring.",
  },
  {
    id: 15,
    category: "time-management",

    categoryLabel: "Time Management & Prioritization",
    categoryColor: "#f59e0b",
    title: "Balancing Academics and Internship",
    question:
      "You juggled a part-time internship or job alongside your studies. How did you stay on top of both?",
    tags: ["work-life balance", "communication", "scheduling"],
    situation:
      "In my penultimate semester, I worked 20 hours per week as a part-time software development intern while carrying a full course load of five subjects.",
    task: "I needed to maintain academic performance, deliver quality work at my internship, and preserve enough energy to remain effective in both environments.",
    action:
      "I created a weekly schedule template that separated deep work time, internship hours, and buffer time for unexpected tasks. I was transparent with my internship manager about my academic deadlines during busy periods and negotiated a lighter workload during exam weeks in advance. At university, I front-loaded readings and assignments early in the week so I was never rushing the night before deadlines.",
    result:
      "I maintained a GPA of 3.4 that semester, the same as my previous semester without an internship, and received a return offer from the company. My manager specifically praised my reliability and communication about capacity. The experience confirmed that transparent time management is far more effective than silently over-committing.",
  },

  // ── Section 4: Communication & Presentation ─────────────────────────────────
  {
    id: 16,
    category: "communication",

    categoryLabel: "Communication & Presentation",
    categoryColor: "#10b981",
    title: "Explaining to a Non-Technical Audience",
    question:
      "You had to present a highly technical concept to a professor or audience with no engineering background. How did you approach it?",
    tags: ["technical communication", "analogy", "teaching"],
    situation:
      "As part of a community engagement initiative, I was asked to explain how machine learning works to a group of local high school teachers with no technical background during a 20-minute session.",
    task: "I needed to make the concept genuinely understandable and engaging, not just simplified to the point of being inaccurate, within a tight time constraint.",
    action:
      "I built my explanation around an analogy my audience could immediately relate to: teaching a child to recognize dogs. I explained training data as examples, the model as the child's developing brain, and predictions as the child's eventual judgment. I avoided all jargon and used physical props: sticky notes representing data points that I grouped on a whiteboard. I also prepared two comprehension questions at the end to confirm understanding.",
    result:
      'All 12 teachers answered the comprehension questions correctly, and three approached me afterward with follow-up questions showing genuine curiosity. One teacher asked if I could return to present to their students. I learned that the best technical communicators lead with the "why it matters" before the "how it works."',
  },
  {
    id: 17,
    category: "communication",

    categoryLabel: "Communication & Presentation",
    categoryColor: "#10b981",
    title: "Delivering Bad News",
    question:
      "You had to inform your professor or project lead that your team wouldn't meet an agreed milestone. What did you do?",
    tags: ["difficult conversations", "proactivity", "professionalism"],
    situation:
      "Three days before a major project milestone check-in, it became clear that our team would only complete 60% of the expected deliverables due to a technical blocker we had underestimated.",
    task: "I needed to inform our professor proactively, take accountability, and present a credible recovery plan rather than simply asking for an extension with no context.",
    action:
      "I sent an email 72 hours before the check-in explaining exactly what we had completed, what was delayed, why, and what our revised delivery plan looked like with specific dates. I requested a 10-minute conversation to discuss rather than simply notifying via email. In that meeting, I led with what we had learned from the blocker and what we were doing differently going forward.",
    result:
      "The professor appreciated the proactivity and professionalism. She granted a three-day extension on the delayed component with no grade penalty. She later mentioned in class that our communication approach was the expected professional standard for engineers. Our team ultimately delivered everything by the revised deadline.",
  },
  {
    id: 18,
    category: "communication",

    categoryLabel: "Communication & Presentation",
    categoryColor: "#10b981",
    title: "Giving Constructive Feedback",
    question:
      "A teammate's code or work had significant issues. How did you provide feedback without damaging the relationship?",
    tags: ["code review", "feedback", "relationships"],
    situation:
      "During a code review for our group project, I identified that a teammate's module had significant performance issues and lacked error handling, which would have caused our application to crash under any realistic load.",
    task: "I needed to communicate serious technical concerns clearly enough that they would be fixed, without making the teammate feel attacked or undermined in front of the group.",
    action:
      'I sent a private message first rather than raising it in our group chat. I started by acknowledging what worked well in their code before raising the issues. I framed my feedback around the impact on the user rather than the quality of the work: "If a user sends an unexpected input here, the app will crash." I also offered to pair program on the fixes rather than just handing back a list of problems.',
    result:
      "My teammate received the feedback well and thanked me for being direct but kind. We fixed the issues together in a two-hour session, which also helped them understand the underlying concepts. Our final submission had zero runtime errors during evaluation. The experience showed me that private, impact-focused feedback with a collaborative offer is far more effective than public criticism.",
  },
  {
    id: 19,
    category: "communication",

    categoryLabel: "Communication & Presentation",
    categoryColor: "#10b981",
    title: "Receiving Critical Feedback",
    question:
      "You received harsh criticism about your work from a professor or supervisor. How did you respond?",
    tags: ["resilience", "growth mindset", "feedback"],
    situation:
      'After presenting my software architecture design in class, my professor publicly described it as "fundamentally flawed" due to my choice of a monolithic design for what he argued should be a microservices architecture.',
    task: "I needed to respond professionally in the moment and then decide how to act on the feedback, even though it felt harsh and public.",
    action:
      "In the moment, I thanked the professor for the feedback and asked a clarifying question to make sure I understood his specific concern rather than reacting defensively. After class, I reviewed the critique, researched the microservices argument more deeply, and scheduled office hours to discuss further. During office hours, I presented a revised architecture and asked the professor to identify any remaining gaps.",
    result:
      "My revised design was accepted and the professor noted the improvement in my final write-up. More importantly, the research I did on microservices became one of my strongest areas of knowledge going into interviews. I learned that critical feedback, even when delivered bluntly, is often the most valuable kind.",
  },
  {
    id: 20,
    category: "communication",

    categoryLabel: "Communication & Presentation",
    categoryColor: "#10b981",
    title: "Presenting with Confidence",
    question:
      "You had to present in front of a large audience or panel and felt nervous. What did you do to prepare and perform well?",
    tags: ["public speaking", "preparation", "confidence"],
    situation:
      "I was selected to present my team's project at a university showcase in front of over 200 students, faculty, and industry guests, which was by far the largest audience I had ever spoken to.",
    task: "I needed to deliver a polished, confident presentation that represented my team well despite significant nerves and limited public speaking experience at the time.",
    action:
      "I prepared obsessively but also strategically: I rehearsed my section 12 times in full, including two run-throughs in the actual room to reduce environmental unfamiliarity. I recorded myself once to identify filler words and rushed sections. I also reframed my nervousness cognitively, reminding myself that the audience wanted me to succeed. On the day, I arrived 30 minutes early, ran through my opening lines three times quietly, and made eye contact with three friendly faces during the talk.",
    result:
      "The presentation was well-received, and several industry guests approached me afterward with questions. My team mentor mentioned that my delivery was one of the strongest in the showcase. I signed up for my university's public speaking workshop the following month to continue developing the skill.",
  },

  // ── Section 5: Learning & Adaptability ──────────────────────────────────────
  {
    id: 21,
    category: "learning",

    categoryLabel: "Learning & Adaptability",
    categoryColor: "#06b6d4",
    title: "Learning a New Technology Quickly",
    question:
      "You had to learn a completely new programming language or framework within a short deadline. Describe your approach.",
    tags: ["React Native", "internship", "learning strategy"],
    situation:
      "At the start of my internship, I was assigned to a React Native mobile project despite having only built web applications with plain React. I had one week before I was expected to contribute meaningful code.",
    task: "I needed to get productive with React Native quickly enough to contribute real work, not just toy examples, within the week.",
    action:
      "I followed a deliberate learning structure: Day 1 I read official documentation and set up a working project. Days 2–3 I rebuilt a small clone of a feature from the existing app to understand its patterns. Day 4 I paired with a senior developer and asked targeted questions about decisions I did not understand from the codebase. Day 5 I picked up my first real ticket. I kept a daily learning log of concepts I encountered so I could review gaps.",
    result:
      "By day 7 I submitted my first pull request, which was merged with only minor comments. My manager noted that I reached productivity faster than expected for someone new to the framework. I also shared my learning log with two other new interns who found it useful.",
  },
  {
    id: 22,
    category: "learning",

    categoryLabel: "Learning & Adaptability",
    categoryColor: "#06b6d4",
    title: "Changing Requirements Mid-Project",
    question:
      "The requirements for your project changed significantly when you were already halfway through. How did you adapt?",
    tags: ["adaptability", "scope change", "responsive design"],
    situation:
      "Halfway through a 10-week software project, the client brief changed to include a mobile-responsive design requirement, which had not been in the original specification and required reworking a significant portion of my already-completed frontend.",
    task: "I needed to incorporate the new requirement without derailing the overall timeline and without sacrificing the quality of my already-completed work.",
    action:
      "I started by impact-assessing every component and categorizing changes as major, minor, or none. I found that 40% of components needed significant rework, 30% needed minor adjustments, and 30% were already responsive. I reprioritized my remaining weeks to address the major rework items first, creating a Trello board specifically for the new requirement so I could track it separately. I also adopted a mobile-first approach for all new components from that point forward to prevent re-work.",
    result:
      "I delivered a fully responsive application by the original deadline, having absorbed the new requirement without an extension. My final project received full marks, and the professor highlighted our team's ability to handle scope changes as a sign of engineering maturity. I now always ask about responsive requirements during the initial scoping phase.",
  },
  {
    id: 23,
    category: "learning",

    categoryLabel: "Learning & Adaptability",
    categoryColor: "#06b6d4",
    title: "Failure as a Learning Experience",
    question:
      "Tell me about a project or assignment that didn't go as planned. What did you learn from it?",
    tags: ["failure", "post-mortem", "web scraping"],
    situation:
      "In my second year, I built a web scraper for a data science assignment that worked correctly on my local machine but completely failed to retrieve data when submitted for evaluation because the target website had rate limiting I had not accounted for.",
    task: "I received a failing grade on the technical component and needed to understand what went wrong and how to prevent it in the future.",
    action:
      "After submission, I conducted a thorough post-mortem on my own time: I read the website's robots.txt and API documentation I had not initially consulted, researched rate limiting patterns, and rebuilt the scraper with exponential backoff and respect for rate limits. I then tested it against a staging environment rather than my local machine. I also wrote up my findings as a short blog post to solidify my learning.",
    result:
      "While I could not change my grade, I emerged with a deep understanding of rate limiting and web scraping best practices. In a subsequent assignment the following semester, my solution handled edge cases that caused other students' scrapers to fail, which contributed to my highest mark of the year. Failure, documented and analyzed, was my most effective teacher.",
  },
  {
    id: 24,
    category: "learning",

    categoryLabel: "Learning & Adaptability",
    categoryColor: "#06b6d4",
    title: "Self-Directed Learning",
    question:
      "You identified a skill gap that your coursework didn't cover but that was important for your goals. How did you address it?",
    tags: ["SQL", "self-study", "career development"],
    situation:
      "I wanted to pursue a backend engineering role but realized my coursework gave me very little practical exposure to SQL and database design, which appeared in almost every job description I was interested in.",
    task: "I needed to develop meaningful SQL proficiency independently, outside of my formal curriculum, in a way that would be credible in interviews and on my resume.",
    action:
      'I completed the "SQL for Data Analysis" course on Mode Analytics over four weeks. I then applied the skills practically by building a personal project: a database-backed dashboard tracking my own university grades and time allocation. I also solved 30 SQL problems on LeetCode, focusing on window functions and query optimization which I identified as advanced skills that differentiated candidates.',
    result:
      "Within six weeks, I was confidently answering SQL questions in technical interviews. I received positive feedback on my SQL skills during my internship screening process, and my interviewer noted that the LeetCode SQL problems I mentioned were exactly the kind they tested. The project also became a talking point in several interviews.",
  },
  {
    id: 25,
    category: "learning",

    categoryLabel: "Learning & Adaptability",
    categoryColor: "#06b6d4",
    title: "Unfamiliar Domain",
    question:
      "You were assigned to work on a project in an engineering domain you had little experience in. How did you get up to speed?",
    tags: ["embedded systems", "knowledge gap", "contribution"],
    situation:
      "I was assigned to an embedded systems group project despite being a software engineering student with almost no prior hardware or firmware experience.",
    task: "I needed to become a useful contributor to an embedded systems project in a domain where my teammates had significantly more background knowledge than I did.",
    action:
      "I was upfront with my team about my knowledge gap and proactively asked them to recommend two resources to get me started rather than spending days figuring out where to begin. I spent the first three days in intensive self-study mode: reading the microcontroller datasheet for the relevant sections, building basic circuits from tutorials, and writing simple test firmware. I also explicitly took on the software integration tasks where my skills were strongest, while taking on one hardware task I knew I needed to stretch into.",
    result:
      "I contributed meaningfully to both the firmware and software components of the project. One of my teammates told me she was surprised by how quickly I became useful. The project scored 88%. The experience taught me to quickly identify where I can add immediate value while simultaneously developing in areas of weakness.",
  },

  // ── Section 6: Initiative & Leadership ──────────────────────────────────────
  {
    id: 26,
    category: "initiative",

    categoryLabel: "Initiative & Leadership",
    categoryColor: "#f97316",
    title: "Spotting an Improvement",
    question:
      "You noticed an inefficiency or flaw in a process or system during a class project or internship. What did you do about it?",
    tags: ["automation", "initiative", "internship"],
    situation:
      "During my internship, I noticed that the team manually reformatted and copied data from one internal tool to a spreadsheet every Monday morning, a process that took the junior developer approximately two hours each week.",
    task: "I identified an opportunity to automate this process, but I was a new intern and had not been asked to work on tooling or infrastructure.",
    action:
      "I spent two evenings building a Python script that automated the data extraction and reformatting. Before showing it to the team, I tested it against four previous weeks of data to verify it produced identical output. I then presented it to my manager as a suggestion rather than a fait accompli: I explained the time savings and asked for feedback before suggesting we adopt it.",
    result:
      "The script was approved and deployed, saving approximately two hours per week. Over my three-month internship, that amounted to roughly 24 hours of reclaimed developer time. My manager mentioned the initiative during my end-of-internship review and it contributed to my return offer. I learned that earned credibility comes from solving problems no one asked you to solve.",
  },
  {
    id: 27,
    category: "initiative",

    categoryLabel: "Initiative & Leadership",
    categoryColor: "#f97316",
    title: "Taking Ownership",
    question:
      "A project was drifting without clear leadership. Describe a time you stepped up to take charge.",
    tags: ["leadership", "ownership", "team recovery"],
    situation:
      "Four weeks into a six-week group project, our team was drifting with no clear owner. We had three separate partial implementations of the same feature, unclear ownership of integration, and a team retrospective where everyone agreed the project felt chaotic.",
    task: "Someone needed to take ownership of the project structure and communication, even though the role had not been formally assigned and I had never led a technical project before.",
    action:
      "I volunteered to serve as the technical lead for the final two weeks. In my first act as lead, I called a two-hour working session to reconcile the three partial implementations into one agreed approach and divided the remaining work into clearly owned tasks. I created a shared project tracker and committed to sending a daily five-line progress update to the group. I also made explicit decisions when the team was stuck rather than letting discussions loop.",
    result:
      "In the final two weeks we made more progress than the previous four. We delivered a complete and functional submission. In our team retrospective, two teammates mentioned that clear ownership was the single biggest factor in our recovery. The experience convinced me that informal leadership is often more impactful than formal authority.",
  },
  {
    id: 28,
    category: "initiative",

    categoryLabel: "Initiative & Leadership",
    categoryColor: "#f97316",
    title: "Proposing a New Idea",
    question:
      "You had an idea that deviated from the original plan but could improve the outcome. How did you pitch and implement it?",
    tags: ["innovation", "persuasion", "data viz"],
    situation:
      "Midway through my team's data visualization project, I realized we were building static charts when the dataset we had lent itself to an interactive visualization that would be dramatically more insightful and impressive.",
    task: "I needed to convince my team to change direction at the midpoint of a project, which carried risk but significant potential upside, without creating conflict or wasting the work already done.",
    action:
      "I prepared a two-minute demo using a free tool to show rather than tell what an interactive version could look like. I also explicitly addressed the risks upfront: what existing work would be preserved versus rebuilt and a realistic estimate of the additional time required. I proposed it as a team vote rather than pushing for it unilaterally.",
    result:
      "The team voted unanimously to proceed with the interactive approach. We completed it within our original timeline because most of the data processing work carried over. The interactive visualization became the most memorable element of our presentation, and the professor asked for a link to share with future cohorts. I learned that ideas land better when backed by a demo and an honest risk assessment.",
  },
  {
    id: 29,
    category: "initiative",

    categoryLabel: "Initiative & Leadership",
    categoryColor: "#f97316",
    title: "Mentoring a Peer",
    question:
      "A classmate was struggling with a concept or task you understood well. How did you help them without doing the work for them?",
    tags: ["mentoring", "teaching", "recursion"],
    situation:
      "A classmate in my data structures course was repeatedly failing to understand recursion and was at risk of failing the upcoming assignment. They asked if I could help them catch up.",
    task: "I needed to help them genuinely understand the concept, not just complete the assignment, in a way that built their independent capability.",
    action:
      "Instead of solving example problems for them, I asked them to explain their current understanding to me first, so I could identify specifically where the mental model broke down. I found they understood the base case but not how the call stack unwinds. I drew the call stack on a whiteboard for one small example and had them trace through it with a pen themselves. Then I gave them three progressively harder problems to attempt alone, with me available to ask questions rather than give answers.",
    result:
      "My classmate successfully completed the assignment independently and scored 82%. They told me it was the first time recursion had genuinely clicked for them. The experience reinforced my belief that teaching is the deepest form of understanding and gave me early insight into how I want to approach mentoring junior colleagues in my career.",
  },
  {
    id: 30,
    category: "initiative",

    categoryLabel: "Initiative & Leadership",
    categoryColor: "#f97316",
    title: "Going Beyond the Brief",
    question:
      "You completed your assigned work but saw an opportunity to add more value. What did you do, and what was the result?",
    tags: ["ownership", "testing", "impact"],
    situation:
      "I completed my internship task of writing unit tests for a specific module two days ahead of schedule and noticed that the test coverage report revealed a completely untested critical payment validation function.",
    task: "I had fulfilled my assigned deliverable but could see an obvious gap that carried real risk to the product. I had to decide whether to flag it, ignore it, or act on it.",
    action:
      "I informed my manager of the gap and asked if it was acceptable for me to write tests for the payment validation function in my remaining two days. She approved. I wrote 12 test cases covering edge cases including invalid card formats, expired cards, and currency mismatch, and documented each test case with a brief explanation of why it mattered.",
    result:
      "Three of my test cases revealed actual bugs in the payment validation logic that had never been caught before. The bugs were fixed before the next release cycle. My manager escalated this finding to the engineering lead, who recognized it in a team meeting. This contribution was the most significant factor in my receiving a return offer and a glowing recommendation letter. I learned that the highest-value engineers are those who look beyond their ticket.",
  },
];
