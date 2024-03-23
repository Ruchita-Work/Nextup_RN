/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
/* eslint-disable react-native/no-inline-styles */
// created by Piyush Prashant at 20231111 17:32.
// piyushprashant93@gmail.com

import React, { useMemo, useState } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  Picker,
  View,
  TextField,
  Text,
  RadioGroup,
  RadioButton,
  Modal,
  Incubator,
  PanningProvider,
  TouchableOpacity,
} from 'react-native-ui-lib';
import _ from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';
import { Layout, customTheme } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SelectableCard } from './SelectableCard';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';
import { statusBarHeight } from './ViewConatiner';
import moment from 'moment';
import { hp, isAndroid } from '../../utils/responsive';
import Back from '../../utils/HeaderButtons/Back';

const searchIcon = (
  <FontAwesomeIcon icon={faSearch} color={customTheme.colors.light} />
);

export const _renderCustomModal = modalProps => {
  const {
    visible,
    children,
    toggleModal,
    onDone,
    label,
    onSearchChange,
    title,
    scrollViewContentContainer,
    ...rest
  } = modalProps;
  return (
    <Modal
      visible={visible}
      overlayBackgroundColor={customTheme.colors.background}
      width={Dimensions.get('window').width}
      height={Dimensions.get('window').height}
      animationType="slide">
      <View
        backgroundColor={customTheme.colors.background}
        width={'100%'}
        height={isAndroid ? hp(2) : statusBarHeight}
      />
      <View backgroundColor={customTheme.colors.background} paddingH-16>
        <Back
          title={label}
          onPress={() => {
            toggleModal(false);
            onDone();
          }}
          containerStyle={{ marginVertical: hp(1) }}
        />
        <TextField
          marginT-16
          placeholder={title}
          paddingH-12
          paddingV-12
          marginT-12
          onChangeText={onSearchChange}
          placeholderTextColor={customTheme.colors.white_08}
          selectionColor={customTheme.colors.light}
          labelColor={customTheme.colors.light}
          color={customTheme.colors.light}
          containerStyle={{
            borderWidth: 1,
            height: Layout.height * 0.06,
            justifyContent: 'center',
            borderColor: customTheme.colors.tertiary,
            backgroundColor: customTheme.colors.background,
          }}
          trailingAccessory={searchIcon}
        />
        {rest?.renderFilter && (
          <>
            <View row marginT-32>
              {rest?.renderFilter()}
            </View>
          </>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: customTheme.spacings.spacing_16,
        }}>
        {children}
      </ScrollView>
    </Modal>
  );
};

export function SearchInput({
  data = [],
  value,
  title,
  label,
  disabled,
  onValueChange,
  children,
  ...rest
}) {
  const [search, setSearch] = useState(null);
  const searchData = search
    ? data.filter(item =>
        item?.value?.toLowerCase().includes(search.toLowerCase()),
      )
    : data;
  return (
    <>
      <Picker
        topBarProps={{
          title: title,
        }}
        editable={!disabled}
        renderPicker={() => {
          return <>{children}</>;
        }}
        renderCustomModal={props =>
          _renderCustomModal({
            ...props,
            label,
            title,
            onSearchChange: text => setSearch(text),
            renderFilter: rest?.renderFilter,
          })
        }>
        {_.map(searchData, (item, index) => {
          return (
            <Picker.Item
              labelStyle={{
                color: customTheme.colors.light,
                fontSize: customTheme.fontSizes.size_16,
                fontFamily: customTheme.fontFamily.robotoRegular,
              }}
              key={index}
              label={item?.label || item}
              value={item?.value || item}
              onPress={() => {
                return onValueChange(item);
              }}
              renderItem={props => {
                return (
                  <Text
                    marginB-8
                    white
                    marginT-32
                    style={{
                      fontFamily: customTheme.fontFamily.robotoMedium,
                      fontSize: customTheme.fontSizes.size_16,
                    }}>
                    {props}
                  </Text>
                );
              }}
            />
          );
        })}
      </Picker>
    </>
  );
}

/**
 * Renders a form input picker component.
 *
 * @param {object} props - The component props.
 * @param {array} props.data - The data for the picker items.
 * @param {string} props.value - The current value of the picker.
 * @param {function} props.onValueChange - The callback function to be called when the picker value changes.
 * @return {JSX.Element} The rendered form input picker component.
 */
export function FormInputPicker({
  data = [],
  value,
  onValueChange,
  label,
  title,
  disabled = false,
  ...rest
}) {
  const [search, setSearch] = useState(null);
  const searchData = search
    ? data.filter(item =>
        item?.value?.toLowerCase().includes(search.toLowerCase()),
      )
    : data;
  return (
    <>
      <Picker
        topBarProps={{
          title: title,
        }}
        editable={!disabled}
        renderPicker={() => {
          return (
            <>
              <FormInputField
                value={value}
                readonly
                label={label}
                picker
                required={rest?.required}
                error={rest?.error}
                placeholder={rest?.placeholder}
                disabled={disabled}
                {...rest}
              />
            </>
          );
        }}
        renderCustomModal={props =>
          _renderCustomModal({
            ...props,
            label,
            title,
            onSearchChange: text => setSearch(text),
            renderFilter: rest?.renderFilter,
          })
        }>
        {_.map(searchData, (item, index) => {
          return (
            <Picker.Item
              labelStyle={{
                color: customTheme.colors.light,
                fontSize: customTheme.fontSizes.size_16,
                fontFamily: customTheme.fontFamily.robotoRegular,
              }}
              key={index}
              label={item?.label || item}
              value={item?.value || item}
              onPress={() => {
                return onValueChange(item);
              }}
              renderItem={props => {
                return (
                  <Text
                    marginB-8
                    white
                    marginT-32
                    style={{
                      fontFamily: customTheme.fontFamily.robotoMedium,
                      fontSize: customTheme.fontSizes.size_16,
                    }}>
                    {props}
                  </Text>
                );
              }}
            />
          );
        })}
      </Picker>
    </>
  );
}
/**
 * Renders a form input picker component.
 *
 * @param {object} props - The component props.
 * @param {array} props.data - The data for the picker items.
 * @param {string} props.value - The current value of the picker.
 * @param {function} props.onValueChange - The callback function to be called when the picker value changes.
 * @return {JSX.Element} The rendered form input picker component.
 */
export function FormActionPicker({
  data = [],
  filterLabel = 'Filter',
  filter = false,
  value,
  onValueChange,
  label,
  title,
  containerStyle,
  ...rest
}) {
  const [visible, setVisible] = useState(null);
  const handleVisible = () => {
    setVisible(!visible);
  };
  function _renderFilter() {
    return (
      <View row centerH>
        <Text small-500 marginR-4>
          {label}
        </Text>
        <FontAwesomeIcon
          icon={faChevronDown}
          color={customTheme.colors.light}
        />
      </View>
    );
  }
  return (
    <>
      <TouchableOpacity onPress={handleVisible} flex>
        {filter && _renderFilter()}
        {!filter && (
          <FormInputField
            readonly
            onKeyPress={() => setVisible(true)}
            onPress={() => setVisible(true)}
            value={value}
            label={label}
            picker
            error={rest?.error}
            required={rest?.required}
            placeholder={rest?.placeholder}
            {...rest}
          />
        )}
      </TouchableOpacity>

      <Incubator.Dialog
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        panDirection={PanningProvider.Directions.DOWN}
        bottom
        width={Layout.width}
        containerStyle={{
          backgroundColor: customTheme.colors.primary,
          borderTopEndRadius: customTheme.spacings.spacing_16,
          borderTopStartRadius: customTheme.spacings.spacing_16,
          marginBottom: 0,
        }}>
        <>
          <FlatList
            contentContainerStyle={{
              padding: customTheme.spacings.spacing_16,
            }}
            data={data ?? []}
            ListHeaderComponent={() => (
              <Text
                marginB-16
                style={{
                  color: customTheme.colors.light,
                  fontSize: customTheme.fontSizes.size_16,
                  fontFamily: customTheme.fontFamily.robotoMedium,
                  textAlign: 'center',
                  opacity: 0.6,
                }}>
                {title || 'Select an option'}
              </Text>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity onPress={() => setVisible(false)} marginB-16>
                <Text
                  style={{
                    color: customTheme.colors.green10,
                    fontSize: customTheme.fontSizes.size_16,
                    fontFamily: customTheme.fontFamily.robotoMedium,
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                marginB-32
                key={index}
                onPress={() => {
                  onValueChange(item?.value || item);
                  setVisible(false);
                }}>
                <Text
                  center
                  green10
                  style={{
                    color: customTheme.colors.green10,
                    fontSize: customTheme.fontSizes.size_16,
                    fontFamily: customTheme.fontFamily.robotoMedium,
                  }}>
                  {item?.label || item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      </Incubator.Dialog>
    </>
  );
}

/**
 * Renders a radio group form component.
 *
 * @param {Object} props - The props object.
 * @param {string} props.label - The label for the form.
 * @param {any} props.value - The value of the radio group.
 * @param {Function} props.onValueChange - The callback function when the value changes.
 * @param {Array} props.radioValues - The array of radio values.
 * @param {string} props.direction - The direction of the radio group (row or column).
 * @return {ReactElement} The rendered radio group component.
 */
export function FormRadioGroup({
  label = 'Form Label',
  value,
  onValueChange,
  radioValues = [],
  direction = 'row',
  ...rest
}) {
  const viewDir = {
    row: true,
    column: false,
  };
  return (
    <View height={hp(10)}>
      <Text
        style={{
          opacity: 0.6,
          marginBottom: customTheme.spacings.spacing_8,
          textTransform: 'uppercase',
          color: customTheme.colors.light,
          fontSize: customTheme.fontSizes.size_12,
          fontWeight: '700',
          fontFamily: customTheme.fontFamily.robotoBold,
        }}>
        {label} {rest?.required && <Text red10>*</Text>}
      </Text>
      <RadioGroup initialValue={value} onValueChange={onValueChange}>
        <View row={viewDir[direction]} animated>
          {_.map(radioValues, (item, index) => {
            return (
              <RadioButton
                key={index}
                value={item?.value ?? ''}
                label={item?.label ?? ''}
                containerStyle={{
                  marginRight: customTheme.spacings.spacing_16,
                  marginTop: customTheme.spacings.spacing_8,
                }}
                labelStyle={{
                  color: customTheme.colors.light,
                }}
                color={customTheme.colors.blue20}
              />
            );
          })}
        </View>
      </RadioGroup>
      {rest?.error && <Text text-error>{rest?.error}</Text>}
    </View>
  );
}

/**
 * A function that renders a selectable form.
 *
 * @return {JSX.Element} An empty JSX element.
 */
export function FormSelectable({ data, value, onChange, ...rest }) {
  return (
    <>
      <View row center spread>
        {_.map(data, (item, index) => {
          return (
            <SelectableCard
              key={index}
              title={item?.label}
              imgSrc={item?.imgSrc}
              isSelected={item?.value === value}
              onPress={() => onChange(item?.value)}
              conatinerStyle={{
                marginHorizontal: customTheme.spacings.spacing_16,
              }}
            />
          );
        })}
      </View>
      <Text red10>{rest?.error}</Text>
    </>
  );
}

export function FormInputField({
  label,
  value,
  error,
  onChangeText,
  removeSpace,
  optionBtn,
  containerStyle,
  disabled = false,
  ...props
}) {
  return (
    <View
      marginR-20
      height={hp(10)}
      style={[disabled && { opacity: 0.65 }, containerStyle]}>
      <View row spread centerH>
        <Text input-label>
          {label} {props?.required && <Text red10>*</Text>}
        </Text>

        {props?.picker && (
          <FontAwesomeIcon
            icon={faChevronDown}
            color={customTheme.colors.light}
          />
        )}
      </View>
      <TextField
        {...props}
        enablesReturnKeyAutomatically
        placeholderTextColor={
          props?.placeholderTextColor || customTheme.colors.tertiary
        }
        value={value}
        color={customTheme.colors.light}
        selectionColor={customTheme.colors.light}
        fieldStyle={{
          borderBottomColor: customTheme.colors.tertiary,
          borderBottomWidth: 1,
          paddingBottom: customTheme.spacings.spacing_8,
          fontSize: customTheme.fontSizes.size_16,
          fontFamily: customTheme.fontFamily.robotoRegular,
          overflow: 'hidden',
        }}
        onChangeText={txt => {
          const value = removeSpace ? txt.replace(/ /g, '') : txt;
          onChangeText(value);
        }}
        enableErrors={error}
        validationMessage={error}
        validationMessageStyle={{
          color: customTheme.colors.red10,
          fontFamily: customTheme.fontFamily.robotoRegular,
          fontSize: customTheme.fontSizes.size_12,
        }}
      />
      {optionBtn && (
        <TouchableOpacity flex right marginT-4 onPress={optionBtn.onPress}>
          <Text link-text>{optionBtn?.title ?? ''}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function FormInputField1({
  label,
  value,
  error,
  onChangeText,
  removeSpace,
  optionBtn,
  containerStyle,
  setVisible,
  disabled = false,
  ...props
}) {
  return (
    <View
      marginR-20
      height={hp(10)}
      style={[disabled && { opacity: 0.65 }, containerStyle]}>
      <View row spread centerH>
        <Text input-label>
          {label} {props?.required && <Text red10>*</Text>}
        </Text>

        {props?.picker && (
          <FontAwesomeIcon
            icon={faChevronDown}
            color={customTheme.colors.light}
          />
        )}
      </View>
      <TextField
        {...props}
        editable={false}
        enablesReturnKeyAutomatically
        placeholderTextColor={
          props?.placeholderTextColor || customTheme.colors.tertiary
        }
        value={value}
        color={customTheme.colors.light}
        selectionColor={customTheme.colors.light}
        fieldStyle={[
          {
            borderBottomColor: customTheme.colors.tertiary,
            borderBottomWidth: 1,
            paddingBottom: customTheme.spacings.spacing_8,
            fontSize: customTheme.fontSizes.size_16,
            fontFamily: customTheme.fontFamily.robotoRegular,
            overflow: 'hidden',
          },
        ]}
        onPressIn={() => setVisible(true)}
        enableErrors={error}
        validationMessage={error}
        validationMessageStyle={{
          color: customTheme.colors.red10,
          fontFamily: customTheme.fontFamily.robotoRegular,
          fontSize: customTheme.fontSizes.size_12,
        }}
      />
      {optionBtn && (
        <TouchableOpacity flex right marginT-4 onPress={optionBtn.onPress}>
          <Text link-text>{optionBtn?.title ?? ''}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/**
 * Renders a form button component.
 *
 * @param {object} props - The button component props.
 * @param {boolean} props.loading - Specifies if the button is in a loading state.
 * @param {boolean} props.disabled - Specifies if the button is disabled.
 * @param {function} props.onPress - The function to be called when the button is pressed.
 * @return {JSX.Element} - The rendered button component.
 */
export function FormButton({
  loading = false,
  disabled = false,
  onPress,
  label = 'Submit',
}) {
  const handlePress = () => {
    if (loading || disabled) {
      return;
    }
    onPress();
  };
  return (
    <>
      <Pressable
        onPress={handlePress}
        disabled={disabled || loading}
        style={{
          backgroundColor:
            disabled || loading
              ? customTheme.colors.tertiary
              : customTheme.colors.blue20,
          borderRadius: customTheme.spacings.spacing_24,
          paddingVertical: customTheme.spacings.spacing_20,
        }}>
        <View row center spread>
          <ActivityIndicator
            animating={loading}
            color={customTheme.colors.white}
          />
          <Text
            animated
            style={{
              color: customTheme.colors.white,
              fontSize: customTheme.fontSizes.size_16,
              fontWeight: '700',
              fontFamily: customTheme.fontFamily.robotoBold,
              textAlign: 'center',
              opacity: disabled ? 0.4 : 1,
            }}>
            {loading ? 'Loading...' : label}
          </Text>
        </View>
      </Pressable>
    </>
  );
}

export function FormDatePicker({
  label,
  value,
  onChange,
  dateFormat = 'MM/DD/YYYY',
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  };
  return (
    <>
      <TouchableOpacity onPress={handleVisible}>
        <FormInputField1
          onKeyPress={() => setVisible(true)}
          onPress={() => setVisible(true)}
          picker
          setVisible={setVisible}
          label={label}
          value={value}
          required={props?.required}
          error={props?.error}
          placeholder={props?.placeholder}
          {...props}
          onChangeText={() => setVisible(true)}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={date => {
          setVisible(false);
          onChange(moment(date).format(dateFormat).toString());
        }}
        maximumDate={new Date()}
        minimumDate={new Date(1900, 0, 1)}
        onCancel={() => handleVisible()}
      />
    </>
  );
}

export const FormMaskedInput = ({
  label,
  value,
  onChangeText,
  data,
  title,
  onValueChange,
  forHeight,
  tailLabel,
  celPhoneMaskPattern = 'INTERNATIONAL',
  type = 'custom',
  ...props
}) => {
  const options = useMemo(() => {
    switch (type) {
      case 'cel-phone':
        return {
          mask: '+9 9999999999',
        };
      case 'cpf':
        return {
          mask: '999.999.999-99',
          options: {
            maskType: 'BRL',
          },
        };
      case 'cnpj':
        return {
          mask: '99.999.999/9999-99',
          options: {
            maskType: 'BRL',
          },
        };
      case 'email':
        return {
          mask: '999.999.999-99',
          options: {
            maskType: 'BRL',
          },
        };
      default:
        return {
          mask: forHeight ? "9'99''" : '999',
        };
    }
  }, [type]);
  return (
    <View flex marginR-20 height={hp(12)} {...props}>
      <>
        <View row spread centerH>
          <Text input-label>
            {label} {props?.required && <Text red10>*</Text>}
          </Text>
          {props?.picker && (
            <FontAwesomeIcon
              icon={faChevronDown}
              color={customTheme.colors.light}
            />
          )}
        </View>
        <View
          row
          centerH
          style={{
            borderBottomColor: customTheme.colors.tertiary,
            borderBottomWidth: 1,
          }}>
          <TextInputMask
            {...props}
            type={'custom'}
            value={value}
            placeholderTextColor={customTheme.colors.tertiary}
            onChangeText={txt => {
              // const pickValue = txt + '-' + pickerValue || data[0].value
              onChangeText(txt);
            }}
            options={{
              ...options,
            }}
            selectionColor={customTheme.colors.light}
            style={{
              color: customTheme.colors.light,
              flex: 1,
              marginTop: 0,
              marginBottom: customTheme.spacings.spacing_8,
              fontSize: customTheme.fontSizes.size_16,
            }}
          />
          {tailLabel && (
            <Text white small-700>
              {tailLabel}
            </Text>
          )}
          {/* <Text white>{pickerValue ?? ''}</Text> */}
        </View>
        {/* <Incubator.Dialog
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        panDirection={PanningProvider.Directions.DOWN}
        bottom

        width={Layout.width}

        containerStyle={{
          backgroundColor: customTheme.colors.primary,
          borderTopEndRadius: customTheme.spacings.spacing_16,
          borderTopStartRadius: customTheme.spacings.spacing_16,
          marginBottom: 0
        }}
      >
        <>

          <FlatList
            contentContainerStyle={{
              padding: customTheme.spacings.spacing_16,
            }}
            data={data ?? []}
            ListHeaderComponent={() => (
              <Text marginB-16 style={{
                color: customTheme.colors.light,
                fontSize: customTheme.fontSizes.size_16,
                fontFamily: customTheme.fontFamily.robotoMedium,
                textAlign: 'center',
                opacity: 0.6,
              }}>{title}</Text>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity onPress={() => setVisible(false)} marginB-16>
                <Text style={{
                  color: customTheme.colors.green10,
                  fontSize: customTheme.fontSizes.size_16,
                  fontFamily: customTheme.fontFamily.robotoMedium,
                  textAlign: 'center',
                }}>Cancel</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity marginB-32 key={index} onPress={() => {
                const split = value.split('-')
                const pickValue = split[1] + '-' + item?.value || item
                onValueChange(pickValue);
                setVisible(false);
              }}>
                <Text center green10 style={{
                  color: customTheme.colors.green10,
                  fontSize: customTheme.fontSizes.size_16,
                  fontFamily: customTheme.fontFamily.robotoMedium,
                }}>{item?.label || item}</Text>

              </TouchableOpacity>
            )}
          />

        </>
      </Incubator.Dialog> */}
      </>
      {props?.error && <Text red10>{props?.error}</Text>}
    </View>
  );
};
