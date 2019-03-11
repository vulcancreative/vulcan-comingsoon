import a from '!raw-loader!./jobdescriptions/a.md';
import b from '!raw-loader!./jobdescriptions/b.md';
import c from '!raw-loader!./jobdescriptions/c.md';
import d from '!raw-loader!./jobdescriptions/d.md';
import e from '!raw-loader!./jobdescriptions/e.md';
import f from '!raw-loader!./jobdescriptions/f.md';
import g from '!raw-loader!./jobdescriptions/g.md';
import h from '!raw-loader!./jobdescriptions/h.md';

const positions = [
  {
    title: "Generalist Copywriter",
    slug: "generalist-copywriter-anywhere",
    location: "Anywhere",
    markdown: a,
  },
  {
    title: "Social Content Designer",
    slug: "social-content-designer-anywhere",
    location: "Anywhere",
    markdown: b,
  },
  {
    title: "UI Designer",
    slug: "ui-designer-anywhere",
    location: "Anywhere",
    markdown: c,
  },
  {
    title: "Senior Front-End Developer",
    slug: "senior-frontend-developer-bangkok",
    location: {
      city: "Bangkok",
      area: "Thailand",
    },
    markdown: d,
  },
  {
    title: "Motion Designer",
    slug: "motion-designer-bangkok",
    location: {
      city: "Bangkok",
      area: "Thailand",
    },
    markdown: e,
  },
  {
    title: "Administrative Assistant",
    slug: "administrative-assistant-portsmouth",
    location: {
      city: "Portsmouth",
      area: "NH",
    },
    markdown: f,
  },
  {
    title: "Visual Designer",
    slug: "visual-designer-portsmouth",
    location: {
      city: "Portsmouth",
      area: "NH",
    },
    markdown: g,
  },
  {
    title: "Account Manager",
    slug: "account-manager-portsmouth",
    location: {
      city: "Portsmouth",
      area: "NH",
    },
    markdown: h,
  },
];

export { positions };
