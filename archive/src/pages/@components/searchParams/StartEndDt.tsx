import React from 'react';
import DateRangePicker from 'components/Input/DateRangePicker';

/**
 * 검색 파라미터 > 시작일, 종류일
 * @returns JSX.Element
 */
const StartEndDt = ({
  disabled,
  startDt,
  endDt,
  onChange,
}: {
  /**
   * disabled
   */
  disabled?: boolean;
  /**
   * 시작일
   */
  startDt?: Date;
  /**
   * 종료일
   */
  endDt?: Date;
  /**
   * onChange
   * @param newDates [시작일, 종료일]
   * @returns void
   */
  onChange: (newDates: (Date | undefined)[]) => void;
}) => {
  return (
    <DateRangePicker
      startDate={startDt}
      endDate={endDt}
      onChange={(dates) => {
        onChange([dates[0] || undefined, dates[1] || undefined]);
      }}
      disabled={disabled}
    />
  );
};

export default StartEndDt;
