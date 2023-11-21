const linkRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const ok = 200;
const created = 201;
const noContent = 204;

export {
  ok, created, noContent, linkRegex,
};
