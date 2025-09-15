// mockData.js
export const mockBookings = [
  {
    id: "df8c68a7-3442-49e0-9eee-2211bcf2c4a8",
    userSlotId: "85c167fd-d210-4a70-8c30-906e38abc068",
    title: "E1",
    description: "description",
    interviewerId: "951",
    interviewerEmailId: "chandrakant.karale@wissen.com",
    recruiterEmailId: "chandrakant.karale@wissen.com",
    slotDate: "2025-09-13T05:00:21Z",
    startDateTime: "2025-09-15T09:00:00Z",
    endDateTime: "2025-09-15T09:35:00Z",
    status: "BOOKED",
    bookedBy: "951",
    bookingDate: "2025-09-01T04:20:19.285087Z",
    interviewSetId: 20051, // use this for getting questions
    interviewSetName: "Test IS - RT",
    candidateId: "chandrakantk@gmail.com",
    candidateEmail: "chandrakantk@gmail.com",
    createdBy: "951",
    createdDateTime: "2025-09-01T04:20:19.285091Z",
    modifiedBy: "951",
    modifiedDateTime: "2025-09-01T04:20:19.285093Z",
    users: [
      {
        id: "951",
        name: null,
        description: null,
        email: "chandrakant.karale@wissen.com",
        type: "USER",
        isActive: true,
      },
    ],
    additionalDetailsList: [],
    meetingId: null,
    meetingLink:
      "https://teams.microsoft.com/meet/487831680602?p=QI285cApsTX8i5aNUR",
    meetingPasscode: null,
    interviewMeetingId: "500304c6-b1b3-497e-b863-3a039dbbc8d0",
    candidateTimeZone: "Asia/Calcutta",
    additionalRecipients: [],
    ninjaPadId: "fb550f21-2aa4-410c-90ee-9232cf039d6a",
    candidateName: "chandrakant Ktest", // use this
    candidateKey: "chandrakantk@gmail.com",
    levelName: "BEGINNER", // use this
    isExceptionSlot: false,
    isActive: true,
    isAdHocRequest: true,
  },
  //   {
  //     id: "df8c68a7-3442-49e0-9eee-2211bcf2c4a9",
  //     userSlotId: "85c167fd-d210-4a70-8c30-906e38abc068",
  //     title: "E1",
  //     description: "description",
  //     interviewerId: "951",
  //     interviewerEmailId: "chandrakant.karale@wissen.com",
  //     recruiterEmailId: "chandrakant.karale@wissen.com",
  //     slotDate: "2025-09-13T05:00:21Z",
  //     startDateTime: "2025-09-13T19:15:21Z",
  //     endDateTime: "2025-09-01T19:16:21Z",
  //     status: "BOOKED",
  //     bookedBy: "951",
  //     bookingDate: "2025-09-01T04:20:19.285087Z",
  //     interviewSetId: 20051, // use this for getting questions
  //     interviewSetName: "Test IS - RT",
  //     candidateId: "chandrakantk@gmail.com",
  //     candidateEmail: "chandrakantk@gmail.com",
  //     createdBy: "951",
  //     createdDateTime: "2025-09-01T04:20:19.285091Z",
  //     modifiedBy: "951",
  //     modifiedDateTime: "2025-09-01T04:20:19.285093Z",
  //     users: [
  //       {
  //         id: "951",
  //         name: null,
  //         description: null,
  //         email: "chandrakant.karale@wissen.com",
  //         type: "USER",
  //         isActive: true,
  //       },
  //     ],
  //     additionalDetailsList: [],
  //     meetingId: null,
  //     meetingLink:
  //       "https://teams.live.com/meet/9354626801843?p=gUelhrW6J8AIODJvsq",
  //     meetingPasscode: null,
  //     interviewMeetingId: "500304c6-b1b3-497e-b863-3a039dbbc8d0",
  //     candidateTimeZone: "Asia/Calcutta",
  //     additionalRecipients: [],
  //     ninjaPadId: "fb550f21-2aa4-410c-90ee-9232cf039d6a",
  //     candidateName: "Ranjith Munnuru", // use this
  //     candidateKey: "chandrakantk@gmail.com",
  //     levelName: "BEGINNER", // use this
  //     isExceptionSlot: false,
  //     isActive: true,
  //     isAdHocRequest: true,
  //   },
];

export const mockQuestionSet = [
  {
    questionId: 1078200,
    description: "Please provide Soft Skill Feedback for",
    expectedAnswers: null,
    topicName: "Soft Skill",
    duration: 1,
    sequence: 0,
    isActive: false,
    answerChecks: [
      {
        answerCheckId: 1127500,
        name: "Communication Skills",
        sequence: 1,
        isActive: null,
        evaluationAreas: ["Communication-Skill"],
      },
      {
        answerCheckId: 1127550,
        name: "Motivation Level",
        sequence: 2,
        isActive: null,
        evaluationAreas: ["Motivation-Level"],
      },
    ],
    isMandatory: true,
    answer: null,
    type: "NORMAL",
    status: "NEW",
  },
  {
    questionId: 1121400,
    description:
      "What is the difference between a StringBuilder and a StringBuffer?",
    expectedAnswers: null,
    topicName: "Java",
    duration: 10,
    sequence: 0,
    isActive: false,
    answerChecks: [
      {
        answerCheckId: 1231350,
        name: "Knows the difference",
        sequence: 1,
        isActive: null,
        evaluationAreas: ["Java"],
      },
      {
        answerCheckId: 1231300,
        name: "Knows how to compare two strings in java?",
        sequence: 2,
        isActive: null,
        evaluationAreas: ["Java"],
      },
    ],
    isMandatory: false,
    answer: null,
    type: "NORMAL",
    status: "NEW",
  },
  {
    questionId: 1105100,
    description: "What is the difference between LIFO and FIFO?",
    expectedAnswers: null,
    topicName: "Java",
    duration: 10,
    sequence: 0,
    isActive: false,
    answerChecks: [
      {
        answerCheckId: 1198250,
        name: "Knows the usage with the help of an example",
        sequence: 2,
        isActive: null,
        evaluationAreas: ["Java"],
      },
      {
        answerCheckId: 1198300,
        name: "Knows the difference between two",
        sequence: 1,
        isActive: null,
        evaluationAreas: ["Java"],
      },
    ],
    isMandatory: false,
    answer: null,
    type: "NORMAL",
    status: "NEW",
  },
  // {
  //     "questionId": 1105150,
  //     "description": "Differentiate between instance and local variables.",
  //     "expectedAnswers": null,
  //     "topicName": "Java",
  //     "duration": 0,
  //     "sequence": 0,
  //     "isActive": false,
  //     "answerChecks": [
  //         {
  //             "answerCheckId": 1198450,
  //             "name": "Knows that Instance-Variable has a default value, local variable no default value.",
  //             "sequence": 2,
  //             "isActive": null,
  //             "evaluationAreas": [
  //                 "Java Basics"
  //             ]
  //         },
  //         {
  //             "answerCheckId": 1198400,
  //             "name": "Instance Variable can be used throught the class whereas local variable can be used only in method.",
  //             "sequence": 3,
  //             "isActive": null,
  //             "evaluationAreas": [
  //                 "Java Basics"
  //             ]
  //         },
  //         {
  //             "answerCheckId": 1198350,
  //             "name": "Knows that Instance-Variable declared outside the method, directly invoked by the method whereas Local-Variable is declared within the method.",
  //             "sequence": 1,
  //             "isActive": null,
  //             "evaluationAreas": [
  //                 "Java Basics"
  //             ]
  //         }
  //     ],
  //     "isMandatory": false,
  //     "answer": "Instance Variable vs    Local Variable\nDeclared outside the method, directly invoked by the method.\tDeclared\twithinthemethod.\nHas a default value.\t\t\tNo default value\nIt can be used throughout the class.\tThe scope is limited to the method.",
  //     "type": "NORMAL",
  //     "status": "NEW"
  // },
  // {
  //     "questionId": 1109900,
  //     "description": "What are the advantages of using JAXB for XML data binding in Java application development?",
  //     "expectedAnswers": null,
  //     "topicName": "Java",
  //     "duration": 9,
  //     "sequence": 0,
  //     "isActive": false,
  //     "answerChecks": [
  //         {
  //             "answerCheckId": 1209350,
  //             "name": "Was able to explain the process of serializing and deserializing Java objects to XML using JAXB.",
  //             "sequence": 1,
  //             "isActive": null,
  //             "evaluationAreas": [
  //                 "JAXB Advantages"
  //             ]
  //         },
  //         {
  //             "answerCheckId": 1209300,
  //             "name": "Knows the benefits of using JAXB for XML data binding in Java application development.",
  //             "sequence": 2,
  //             "isActive": null,
  //             "evaluationAreas": [
  //                 "JAXB Advantages"
  //             ]
  //         }
  //     ],
  //     "isMandatory": true,
  //     "answer": "Using JAXB for XML data binding in Java application development offers several advantages. Firstly, it simplifies the process of converting between XML and Java objects, allowing seamless integration between XML data and Java code. Secondly, JAXB provides automatic mapping between XML and Java, reducing the need for manual parsing and manipulation of XML data. Additionally, JAXB supports the serialization and deserialization of Java objects to XML, making it easier to store and exchange data in a standardized format.",
  //     "type": "NORMAL",
  //     "status": "NEW"
  // },
  // {
  //     "questionId": 1110150,
  //     "description": "Explain the concept of virtual machines in Azure cloud platform.",
  //     "expectedAnswers": null,
  //     "topicName": "AzureCloud",
  //     "duration": 10,
  //     "sequence": 0,
  //     "isActive": false,
  //     "answerChecks": [
  //         {
  //             "answerCheckId": 1214050,
  //             "name": "Was able to explain the scalability and flexibility offered by Azure virtual machines in terms of resource allocation.",
  //             "sequence": 1,
  //             "isActive": null,
  //             "evaluationAreas": [
  //                 "Virtual Machines"
  //             ]
  //         },
  //         {
  //             "answerCheckId": 1214000,
  //             "name": "Knows that virtual machines in Azure provide the ability to run multiple operating systems on a single physical server.",
  //             "sequence": 2,
  //             "isActive": null,
  //             "evaluationAreas": [
  //                 "Virtual Machines"
  //             ]
  //         }
  //     ],
  //     "isMandatory": false,
  //     "answer": "In Azure cloud platform, virtual machines provide the capability to run multiple operating systems on a single physical server. This allows users to easily create and manage virtual machines to meet their specific needs. Azure virtual machines also offer scalability and flexibility in terms of resource allocation, allowing users to easily adjust the performance and capacity of their virtual machines as needed.",
  //     "type": "NORMAL",
  //     "status": "NEW"
  // },
  // {
  //     "questionId": 1110200,
  //     "description": "You have a subscription named Subscription1.Subscription1 has one Azure virtual machine named VM1. You can't seem to login into the server. What tool should you use to verify if the problem is the network security group?",
  //     "expectedAnswers": null,
  //     "topicName": "AzureCloud",
  //     "duration": 5,
  //     "sequence": 0,
  //     "isActive": false,
  //     "answerChecks": [
  //         {
  //             "answerCheckId": 1214100,
  //             "name": "IP flow verify tool in Azure Network Watcher",
  //             "sequence": 1,
  //             "isActive": null,
  //             "evaluationAreas": [
  //                 "Dummy Evaluation Area"
  //             ]
  //         }
  //     ],
  //     "isMandatory": false,
  //     "answer": null,
  //     "type": "NORMAL",
  //     "status": "NEW"
  // },
  // {
  //     "questionId": 2287851,
  //     "description": "What are various oops concepts in Java",
  //     "expectedAnswers": null,
  //     "topicName": "Java",
  //     "duration": 10,
  //     "sequence": 0,
  //     "isActive": false,
  //     "answerChecks": [
  //         {
  //             "answerCheckId": 2287901,
  //             "name": "Inheritance",
  //             "sequence": 1,
  //             "isActive": null,
  //             "evaluationAreas": [
  //                 "Java"
  //             ]
  //         }
  //     ],
  //     "isMandatory": false,
  //     "answer": "Inheritance, Abstraction",
  //     "type": "NORMAL",
  //     "status": "NEW"
  // }
];
