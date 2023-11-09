export type EndWorkSessionParams = {
  userId: number
  workSessionId: number
};

type TemplateList = {
  id: number
  templateTabId: number
  name: string
  displayOrder: number
  createdAt: string
  updatedAt: string
};

type TemplateTab = {
  id: number
  templateId: number
  name: string
  displayOrder: number
  createdAt: string
  updatedAt: string
  lists: TemplateList[]
};

type Template = {
  id: number
  userId: number
  name: string
  createdAt: string
  updatedAt: string
  tabs: TemplateTab[]
};

export type GetTemplatesResponse = {
  templates: Template[]
};
