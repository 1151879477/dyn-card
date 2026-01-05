
import { ComponentType, CardSchema } from './types';

export const SAMPLE_CARD_SCHEMA: CardSchema = {
  title: "Project Approval Workflow",
  theme: {
    primary: "#6366f1",
    gradientFrom: "#6366f1",
    gradientTo: "#ec4899"
  },
  body: [
    {
      id: "header_section",
      type: ComponentType.CONTAINER,
      style: "bg-white p-6 rounded-t-xl border-b",
      children: [
        {
          id: "main_title",
          type: ComponentType.TITLE,
          props: { text: "Creative Campaign 2024 Launch", level: 1 }
        },
        {
          id: "sub_remark",
          type: ComponentType.REMARK,
          props: { label: "Priority", content: "High", color: "red" }
        }
      ]
    },
    {
      id: "info_grid",
      type: ComponentType.COLUMNS,
      props: { gap: 4, cols: 2 },
      style: "bg-white p-6",
      children: [
        {
          id: "col1",
          type: ComponentType.CONTAINER,
          children: [
            { id: "t1", type: ComponentType.DUAL_TEXT, props: { label: "Project ID", value: "PRJ-9901" } },
            { id: "t2", type: ComponentType.DUAL_TEXT, props: { label: "Owner", value: "Sarah Jenkins" } }
          ]
        },
        {
          id: "col2",
          type: ComponentType.CONTAINER,
          children: [
            { id: "t3", type: ComponentType.DUAL_TEXT, props: { label: "Department", value: "Marketing" } },
            { id: "t4", type: ComponentType.DUAL_TEXT, props: { label: "Budget", value: "$45,000" } }
          ]
        }
      ]
    },
    {
      id: "divider_1",
      type: ComponentType.DIVIDER,
      style: "my-0"
    },
    {
      id: "form_area",
      type: ComponentType.FORM_CONTAINER,
      style: "bg-slate-50 p-6 space-y-4",
      props: {
        onSubmitUrl: "/api/submit-form"
      },
      children: [
        {
          id: "title_form",
          type: ComponentType.TITLE,
          props: { text: "Review Feedback", level: 2 }
        },
        {
          id: "reason_input",
          type: ComponentType.INPUT,
          field: "approval_reason",
          props: { label: "Approval/Rejection Reason", placeholder: "Please enter your reasoning...", multiline: true }
        },
        {
          id: "deadline_date",
          type: ComponentType.DATE_PICKER,
          field: "target_date",
          props: { label: "Follow-up Date" }
        },
        {
          id: "approver_select",
          type: ComponentType.PERSON_PICKER,
          field: "next_approver",
          props: { label: "Assign Next Reviewer" }
        },
        {
          id: "submit_btn",
          type: ComponentType.BUTTON,
          props: { label: "Submit Approval", variant: "primary", isSubmit: true }
        }
      ]
    },
    {
      id: "chart_section",
      type: ComponentType.CONTAINER,
      style: "bg-white p-6 rounded-b-xl border-t",
      children: [
        {
          id: "chart_title",
          type: ComponentType.TITLE,
          props: { text: "Resource Allocation History", level: 2 }
        },
        {
          id: "perf_chart",
          type: ComponentType.CHART,
          props: {
            data: [
              { name: 'Jan', value: 400 },
              { name: 'Feb', value: 300 },
              { name: 'Mar', value: 600 },
              { name: 'Apr', value: 800 },
            ]
          }
        }
      ]
    }
  ]
};
