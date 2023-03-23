export type SenderSendResult = {
  externalIds: string[];

  errors?: { [contact: string]: string };
};
