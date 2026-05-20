import { getTrackBackground, Range } from "react-range";
import theme from "@/theme";

const InputRange = ({ STEP, MIN, MAX, values, handleChanges }) => {
  const { primary, track } = theme.colors;

  return (
    <>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(vals) => handleChanges(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '3px',
              width: '100%',
              background: getTrackBackground({
                values: values,
                colors: [track, primary, track],
                min: MIN,
                max: MAX
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '17px',
              width: '5px',
              backgroundColor: primary,
            }}
          />
        )}
      />
    </>
  );
};

export default InputRange;
