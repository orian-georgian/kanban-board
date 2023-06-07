import Statuses from "./statuses";

const tasks = [
  {
    id: 0,
    boardId: 0,
    title: "Sed consequat, leo eget bibendum sodales, augue velit cursus nunc",
    description:
      "Vis exerci persius tibique in. Ex veri officiis est. Ei iudico consul eam. Eu mea dicant utamur consectetuer. Rebum senserit no sit, voluptatum consequuntur ea qui.",
    status: Statuses.TODO,
    subtasks: [
      {
        id: 0,
        name: "Create items list and display it",
        checked: false,
      },
      {
        id: 1,
        name: "Edit items after open",
        checked: false,
      },
      {
        id: 2,
        name: " Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        checked: false,
      },
    ],
  },
  {
    id: 1,
    boardId: 0,
    title: "Build UI for search",
    description:
      "Etiam error apeirian vix ad, in pro ornatus salutatus. Ridens impedit sea in, pri ullum impetus neglegentur et. Te tibique recteque usu. Autem quaerendum interpretaris pri et.",
    status: Statuses.TODO,
    subtasks: [],
  },
  {
    id: 2,
    boardId: 0,
    title: "Design settings and search pages",
    description:
      "Nec sumo facilisi intellegebat ex, nam at facer iuvaret eripuit. Has simul omittantur in. Pri ei praesent explicari deseruisse.",
    status: Statuses.DOING,
    subtasks: [],
  },
  {
    id: 3,
    boardId: 0,
    title: "Create wireframe prototype",
    description:
      "Graecis disputationi mea ex, vim ex mollis mentitum. Ludus mentitum constituam eum ad, primis possit conceptam et mei.",
    status: Statuses.DONE,
    subtasks: [],
  },
  {
    id: 4,
    boardId: 0,
    title: "Review results and usability tests and iterate",
    description:
      "Copiosae consetetur ne per. Ad nam ornatus accumsan delectus. Vim viderer iracundia cotidieque ei, solum aperiri eum ea, no sea lorem error.",
    status: Statuses.DONE,
    subtasks: [],
  },
  {
    id: 5,
    boardId: 0,
    title: "Create requests page",
    description:
      "Sed ne mundi democritum sententiae. Possit facilisis adipiscing est ei, nulla theophrastus ad pri. Eu vis malis probatus, nam legere viderer fuisset id, eam zril aliquip vituperatoribus cu. Ius feugait euripidis ut, nec labore probatus in. An vitae consectetuer his.",
    status: Statuses.DONE,
    subtasks: [],
  },
];

export default tasks;
