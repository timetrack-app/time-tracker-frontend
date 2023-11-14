export type GetTemplateRequest = {
  authToken: string
  userId: number
  templateId: number
};

type List = {
  id: number
  templateTabId: number
  name: string
  displayOrder: number
  createdAt: string
  updatedAt: string
}

type Tab = {
  id: number
  templateId: number
  name: string
  displayOrder: number
  createdAt: string
  updatedAt: string
  lists: List[]
};

export type GetTemplateResponse = {
  id: number
  userId: number
  name: string
  createdAt: string
  updatedAt: string
  tabs: Tab[]
}

export type DeleteTemplateRequest = {
  authToken: string
  userId: number
  templateId: number
};
