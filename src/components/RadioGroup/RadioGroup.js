// @flow
import React from 'react';
import camelCase from 'lodash/camelCase';

type Props = {
  name: string,
  label: string,
  items: Array<string>,
  value: string,
  onChange: Function,
  itemLabel?: Function,
  vertical?: boolean,
};

const handleChange = (item, change) => {
  return (e) => {
    if (e.target.checked) {
      change(item)
    }
  }
};

const handleItemLabel = (item, i, itemLabel) => {
  if (itemLabel) {
    return itemLabel(item, i);
  } else {
    return item;
  }
};

const defaultItemLabel = item => item;

const RadioGroup = ({ name, label, items, value, isActive, itemLabel=defaultItemLabel, onChange, vertical=false, ...props }: Props) => {
  return <div style={styles.container}>
    <div><strong>{label}</strong></div>
    <div style={{ ...styles.items, ...(vertical ? styles.verticalItems : {}) }}>
      {
        items.map((item, i) => <label key={`rg-${item}`} style={styles.item}>
          <input
            type="radio"
            name={name || camelCase(label)}
            checked={item === value}
            value={item}
            onChange={handleChange(item, onChange)}
            {...props} />
          {' '}
          {handleItemLabel(item, i, itemLabel)}
        </label>)
      }
    </div>
  </div>
}

const styles = {
  container: {
  },
  item: {
    marginRight: 10,
    whiteSpace: 'nowrap',
  },
  items: {
    display: 'flex',
    flexDirection: 'row'
  },
  verticalItems: {
    flexDirection: 'column'
  }
}

export default RadioGroup;
