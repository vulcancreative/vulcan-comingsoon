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
    type: "design",
  },
  {
    title: "Social Content Designer",
    slug: "social-content-designer-anywhere",
    location: "Anywhere",
    markdown: b,
    type: "design",
  },
  {
    title: "UI Designer",
    slug: "ui-designer-anywhere",
    location: "Anywhere",
    markdown: c,
    type: "design",
  },
  {
    title: "Senior Front-End Developer",
    slug: "senior-frontend-developer-bangkok",
    location: {
      city: "Bangkok",
      area: "Thailand",
    },
    markdown: d,
    type: "engineering",
  },
  {
    title: "Motion Designer",
    slug: "motion-designer-bangkok",
    location: {
      city: "Bangkok",
      area: "Thailand",
    },
    markdown: e,
    type: "design",
  },
  {
    title: "Administrative Assistant",
    abbr: "Admin Assistant",
    slug: "administrative-assistant-portsmouth",
    location: {
      city: "Portsmouth",
      area: "NH",
    },
    markdown: f,
    type: "business",
  },
  {
    title: "Iconographer",
    slug: "iconographer-portsmouth",
    location: {
      city: "Portsmouth",
      area: "NH",
    },
    markdown: g,
    type: "design",
  },
  {
    title: "Account Manager",
    slug: "account-manager-portsmouth",
    location: {
      city: "Portsmouth",
      area: "NH",
    },
    markdown: h,
    type: "business",
  },
];

export { positions };
