import { StyleSheet } from 'react-native';
import { wp } from '../../../../utils/responsive';
import { customTheme } from '../../../../constants';

const commonChatStyles = StyleSheet.create({
  container: isSameCurrentUser => ({
    flexDirection: isSameCurrentUser ? 'row' : 'row-reverse',
    alignItems: 'flex-end',
  }),
  dateTimeText: {
    fontSize: customTheme.fontSizes.size_13,
    fontWeight: '500',
    color: customTheme.colors.Gray98 + '30',
  },
  messageBorderRadius: (isSameCurrentUser, isNextMessageSame) => ({
    borderTopLeftRadius: isSameCurrentUser ? wp(5) : wp(2),
    borderTopRightRadius: isSameCurrentUser ? wp(2) : wp(5),
    borderBottomLeftRadius:
      !isSameCurrentUser && isNextMessageSame ? wp(2) : wp(5),
    borderBottomRightRadius:
      isSameCurrentUser && isNextMessageSame ? wp(2) : wp(5),
  }),
});

export default commonChatStyles;
