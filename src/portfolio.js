/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: true, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Sameer's Portfolio",
  description:
    "A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
  og: {
    title: "Sameer Shanbhag's Portfolio",
    type: "website",
    url: "https://sameershanbhag.com/",
  },
};

//Home Page
const greeting = {
  title: "Sameer Shanbhag",
  logo_name: "SameerShanbhag",
  nickname: "Sam",
  subTitle:
    "I'm a passionate individual dedicated to crafting end-to-end solutions that foster sustainable and scalable social and technical systems, all with the goal of making a meaningful impact. I thrive on these challenges, driven by the desire to leave a lasting mark through innovative solutions",
  resumeLink:
    "https://drive.google.com/file/d/1CyDfgsYK4oSOSNHed52jv2szaxwqg6d3/view?usp=sharing",
  portfolio_repository: "https://github.com/sameershanbhag",
  githubProfile: "https://github.com/sameershanbhag",
};

const socialMediaLinks = [
  {
    name: "Github",
    link: "https://github.com/sameershanbhag",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/sameershanbhag/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  {
    name: "Gmail",
    link: "mailto:sameershanbhag14@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
    backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  },
];

const skills = {
  data: [
    {
      title: "Full Stack Software Development",
      fileName: "FullStackImg",
      skills: [
        "⚡ Crafting responsive and intuitive web interfaces with a keen eye for user experience, I'm well-versed in utilizing web frameworks to ensure seamless functionality across various browsers",
        "⚡ My proficiency extends to the development of robust and secure server-side applications using a variety of back-end technologies and server-side programming. I'm no stranger to creating application backends with Java, Node, Spring, Express, and Flask.",
        "⚡ With a dynamic skill set, I'm adept at building application frontends using cutting-edge technologies like React and Angular with Tailwind and/or Bootstrap. My focus is on creating visually appealing, interactive, and engaging user interfaces.",
        "⚡ Expert in distributed systems and microservices, I specialize in scalable and resilient architectures using Docker, Kubernetes, and cloud platforms. Focused on performance and adaptability, I ensure seamless service integration and efficient deployment.",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: {
            color: "#3776AB",
          },
        },
        {
          skillName: "Java",
          fontAwesomeClassname: "logos:java",
          style: {
            color: "#1E3050",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "Spring Boot",
          fontAwesomeClassname: "simple-icons:spring",
          style: {
            color: "#47A248",
          },
        },
        {
          skillName: "Flask",
          fontAwesomeClassname: "simple-icons:flask",
          style: {
            color: "#000000",
          },
        },
        {
          skillName: "Django",
          fontAwesomeClassname: "simple-icons:django",
          style: {
            color: "#092E20",
          },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "simple-icons:nodedotjs",
          style: {
            color: "#339933",
          },
        },
        {
          skillName: "ExpressJS",
          fontAwesomeClassname: "simple-icons:express",
          style: {
            color: "#000000",
          },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
          },
        },
      ],
    },
    {
      title: "Multi Cloud Deployment",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Experience working on multiple cloud platforms",
        "⚡ Hosting and maintaining websites on virtual machine instances along with integration of databases",
        "⚡ Implementing event-driven architectures using AWS Simple Notification Service, Simple Queue Service, and Step Functions",
        "⚡ Setting up streaming jobs from DB to Server or vice-versa on GCP and AWS",
        "⚡ Writing Serverless Functions, Schedulers, and Cron Jobs on AWS",
      ],
      softwareSkills: [
        {
          skillName: "GCP",
          fontAwesomeClassname: "simple-icons:googlecloud",
          style: {
            color: "#4285F4",
          },
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "AWS Simple Notification Service",
          fontAwesomeClassname: "logos:aws-sns",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "AWS Simple Queue Service",
          fontAwesomeClassname: "logos:aws-sqs",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "AWS Step Functions",
          fontAwesomeClassname: "logos:aws-step-functions",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "AWS Simple Storage Service",
          fontAwesomeClassname: "logos:aws-s3",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "AWS Lambda",
          fontAwesomeClassname: "logos:aws-lambda",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "Firebase",
          fontAwesomeClassname: "simple-icons:firebase",
          style: {
            color: "#FFCA28",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "Kubernetes",
          fontAwesomeClassname: "simple-icons:kubernetes",
          style: {
            color: "#326CE5",
          },
        },
      ],
    },
  ],
};

// Education Page

const education = {
  description:
    "My academic journey has been a progressive exploration. I began with my undergraduate degree in Information Technology, which gave me a solid foundation in software basics and ignited my interest in hardware intricacies. Eager to delve deeper, I pursued a master's in computer science. This advanced program provided a comprehensive understanding of software development and architecture, allowing me to explore various facets of this dynamic field. It was a transformative experience that not only deepened my knowledge but also nurtured my passion for technology innovation and problem-solving.",
};

const competitiveSites = {
  competitiveSites: [],
};

const degrees = {
  degrees: [
    {
      title: "University of North Carolina at Charlotte",
      subtitle: "M.S. in Computer Science",
      logo_path: "c_logo.png",
      alt_name: "Charlotte University",
      duration: "2020 - 2021",
      descriptions: [
        "⚡ Specialized in AI — graduate coursework in Graph Machine Learning and Computer Vision that underpins the agent systems I build today.",
        "⚡ Research assistant on the Integrated Genome Browser, a DNA-visualization tool used by genomics researchers — built its companion website and learned what it takes to ship software for working scientists.",
        "⚡ Interned at Qualcomm on Audio DSP tooling while completing the degree — the internship that converted into my full-time engineering role there.",
      ],
      website_link: "https://www.uncc.edu/",
      color: "#005035",
    },
    {
      title: "SIES Graduate School of Technology",
      subtitle: "B.E. in Information Technology",
      logo_path: "sies_logo.png",
      alt_name:
        "SIES Graduate School of Technology - Navi Mumbai - Maharashtra",
      duration: "2012 - 2016",
      descriptions: [
        "⚡ Built the computer-science core — data structures, algorithms, databases, operating systems, computer architecture, and a first pass at AI.",
        "⚡ Went beyond the syllabus into Python, data science, cloud computing, and full-stack development — the toolkit that carried straight into my first job.",
        "⚡ Shipped websites for college events on the Student Council tech team — an early lesson in building for real users on real deadlines.",
      ],
      website_link: "http://sies.edu.in",
      color: "#F26E21",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "AWS Cloud Practitioner",
      subtitle: "- Amazon Web Services",
      logo_path: "aws_cpc.png",
      certificate_link:
        "https://www.credly.com/badges/704f3aa9-aca7-4521-b81a-e7ca516e4d83",
      alt_name: "Credly",
      color_code: "#EC5250",
    },
    {
      title: "React.js",
      subtitle: "- Eve Porcello",
      logo_path: "linkedin_learning.png",
      certificate_link:
        "https://www.linkedin.com/learning/certificates/2eabe442a143d28c10379c47f08790e06c62d71f7910a1e14f85b5ed2450ad2f",
      alt_name: "LinkedIn Learning",
      color_code: "#C9EAFC",
    },
    {
      title: "Taming Big Data with Apache Spark and Python",
      subtitle: "- Frank Kane",
      logo_path: "udemy_logo.png",
      certificate_link: "https://www.udemy.com/certificate/UC-JMTHV9ON/",
      alt_name: "udemy",
      color_code: "#EC5250",
    },
    {
      title: "Programming Foundations: Design Patterns",
      subtitle: "- Eric Freeman and Elisabeth Robson",
      logo_path: "linkedin_learning.png",
      certificate_link:
        "https://www.linkedin.com/learning/certificates/ad5ca23e3fce71f8079ac2d93b5917ed09fd8a72a185c3e7fa5644a66654a071",
      alt_name: "LinkedIn Learning",
      color_code: "#C9EAFC",
    },
    {
      title: "Programming Foundations: Algorithms",
      subtitle: "- Joe Marini",
      logo_path: "linkedin_learning.png",
      certificate_link:
        "https://www.linkedin.com/learning/certificates/e93d9a8ce0643a0bcbdfd903358d7cde3bc6c730e0f2b20c4975f91425f34f86",
      alt_name: "LinkedIn Learning",
      color_code: "#C9EAFC",
    },
    {
      title: "TypeScript Essential Training (2016)",
      subtitle: "- Jess Chadwick",
      logo_path: "linkedin_learning.png",
      certificate_link:
        "https://www.linkedin.com/learning/certificates/ad7b51d64dace5c417e2a9d439e2a5d8a01e28f41c1c4ae8230dec2215ed83f8",
      alt_name: "LinkedIn Learning",
      color_code: "#C9EAFC",
    },
    {
      title: "Multilingual Web Technologies",
      subtitle: "- CADAC India PACE Initiative",
      logo_path: "cdac_logo.png",
      certificate_link:
        "https://drive.google.com/file/d/1SlRXnKZFUz78UOF_r3x4pD5j0aKnjnLm/view",
      alt_name: "CDAC",
      color_code: "#EC5250",
    },
    {
      title: "Intensive Cloud Computing",
      subtitle: "- Jean Rodrigues",
      logo_path: "thecloudbootcamp.png",
      certificate_link:
        "https://app.thecloudbootcamp.com/certificates/yysrllhq4l",
      alt_name: "the CLoud Bootcamp",
      color_code: "#EC5250",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work & Internship",
  description:
    "As an accomplished software developer with a multifaceted career spanning diverse industries, including fintech, bioinformatics, and the semiconductor sector, I bring a unique blend of expertise and adaptability to the table. My journey in software development has allowed me to not only master the intricacies of cutting-edge technologies but also to understand the distinct needs and challenges of each industry. This extensive experience has made me agile, enabling me to seamlessly integrate into any organization and quickly adapt to its unique objectives and processes. It's this versatility that sets me apart, empowering me to not only meet but exceed the expectations of my employers, regardless of the industry. I'm excited to contribute my skills and knowledge to drive success for the next company I join.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "Staff Software Engineer",
          roles: [
            {
              title: "Staff Software Engineer",
              duration: "May 2026 - Present",
            },
            {
              title: "Senior Software Engineer",
              duration: "March 2024 - May 2026",
            },
          ],
          company: "Walmart Global Tech",
          company_url: "https://tech.walmart.com/",
          logo_path: "walmart_logo.png",
          duration: "March 2024 - Present",
          location: "Sunnyvale, California (Bay Area)",
          points: [
            "Founding engineer on Marty, one of Walmart's largest AI agents — took its multi-agent architecture from concept to production. Built the LangGraph orchestration layer that routes work across specialized sub-agents, with checkpointing over Redis and Postgres so long-running agent workflows survive failures and resume mid-conversation.",
            "Designed the Component Registry that lets Marty answer with real product UI instead of walls of text: sub-agents emit structured output that the registry resolves into interactive components rendered directly in the app.",
            "Owned billing services for Walmart Connect, Walmart's advertising business — Java services on Kubernetes that reconcile high-volume ad spend, streaming billing events through Pub/Sub into BigQuery with PostgreSQL as the system of record.",
          ],
          color: "#0071ce",
        },
        {
          title: "Software Engineer",
          company: "Qualcomm Technologies Inc.",
          company_url: "https://qualcomm.com",
          logo_path: "q_logo.png",
          duration: "February 2021 - January 2024",
          location: "Michigan, United States",
          points: [
            "Developed a dynamic UI leveraging React, HTML, CSS, and JavaScript, integrating Java, Spring, Python, Django REST APIs with MySQL and DynamoDB to enhance data visualization and customer satisfaction.",
            "Led the development of a Python-based statistical package for audio algorithm testing with NumPy and SciPy, achieving an 80% improvement in test precision. Implemented a CI/CD pipeline using Jenkins, Docker, and Terraform, reducing deployment errors by 20%.",
            "Built an Audio Logging Library using Python and Matplotlib for real-time visualizations and hardware tuning, halving audio processing time, and led Agile/Scrum teams to a 20% cost saving, enhancing stakeholder satisfaction.",
          ],
          color: "#3253dc",
        },
        {
          title: "Software Developer",
          company: "Loraine Lab",
          company_url: "https://bioviz.org/overview.html",
          logo_path: "c_logo.png",
          duration: "May 2019 - December 2020",
          location: "North Carolina, United States",
          points: [
            "Led the development and maintenance of the Integrated Genome Browser, utilizing Java and the OSGi Framework, and created robust RESTful APIs with Spring Boot, in collaboration with a team of developers and an academic expert.",
            "Instrumental in developing a Python and Django-based Appstore for the browser, integrating Java-based services for seamless interaction and deploying on Amazon AWS EC2 using Ansible for enhanced scalability.",
            "Also spearheaded the Genome Dashboard web application, employing Python Flask, Vanilla JavaScript, and Bootstrap for UI design, ensuring effective communication with the Desktop Application and efficient genome data display.",
          ],
          color: "#004c32",
        },
        {
          title: "Software Engineer",
          company: "Morgan Stanley",
          company_url: "https://morganstanley.com/",
          logo_path: "ms_logo.png",
          duration: "August 2016 - December 2018",
          location: "Mumbai, India",
          description:
            "Led the creation of an intelligent document organizer and an NLP tool that drastically reduced retrieval times by 90% and cut manual analysis by 80%, and co-developed a website for enhanced data analysis with advanced visualizations. Spearheaded an Angular 6, HTML5, CSS, and Java-based web application for Morgan Stanley in partnership with Thomson Reuters, incorporating D3JS for improved analytical efficiency by 50%. Pioneered a machine learning prototype for automatic company name recognition using Java, Python, and NLP libraries, significantly boosting data accuracy and relevance.",
          color: "#022950",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "Software Engineering Intern",
          company: "Qualcomm Technologies Inc.",
          company_url: "https://qualcomm.com",
          logo_path: "q_logo.png",
          duration: "May 2020 - August 2020",
          location: "Michigan, United States",
          description:
            "Streamlined Audio DSP algorithm testing by building out the team's CI/CD pipeline and writing a Python analysis script that replaced the legacy MATLAB workflow — an 80% boost in testing efficiency that made new analyses far easier for developers to integrate. The internship converted into a full-time engineering role.",
          color: "#3253dc",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "I have developed a lot of projects trying to gain experience and knowledge with respect to the latest technologies, my goal is to develope some examples to learn and deploy them to cloud infrastructure using DevOps technologies.",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  title: "Publications",
  description: "I have worked on and published a research paper.",
  avatar_image_path: "projects_image.svg",
};

const publications = {
  data: [
    {
      id: "intelligent-shopping-agent",
      name: "Intelligent Shopping Agent",
      createdAt: "2014-03-14T16:26:54Z",
      description:
        "AI Agent to give you recommended products based on your preferences and past purchases",
      url:
        "https://www.ijcseonline.org/pdf_paper_view.php?paper_id=845&29-IJCSE-01562.pdf",
    },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "animated_sameer.png",
    description:
      "If you are interested in collaboration on some project or have an amazing opportunity for me, feel free to drop a message. You can contact me using the social media handles below. ",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "Join me on an exciting journey to unravel the intricacies of software development in an ever-evolving industry—let's connect and explore the limitless possibilities together!",
    link: "https://sameershanbhag.com/blogs/",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Address",
    subtitle: "Somwhere on the World Wide Web :D",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://maps.app.goo.gl/Prp8zXhNVMqHGu4PA",
  },
  phoneSection: {
    title: "",
    subtitle: "",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  education,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  contactPageData,
};
