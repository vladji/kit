interface Props {
  from: string | null;
  to: string;
}

export const composeChatId = ({ from, to }: Props) => {
  if (!from) {
    return null;
  }

  const [userA, userB] = [from, to].sort();
  return `chat-${userA}-${userB}`;
};
