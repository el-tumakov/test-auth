export class BaseSender {
  buildMessageByDestination(destination, message, payload) {
    return message.replace(
      /{{(.*?)}}/g,
      (entry, word) =>
        payload[word] ||
        (payload[destination] ? payload[destination][word] : false) ||
        '{{' + word + '}}',
    );
  }
}
