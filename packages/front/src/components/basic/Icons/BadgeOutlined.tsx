import IconBase, { IconBaseProps } from './IconBase';

export const BadgeOutlined: React.FC<IconBaseProps> = (props) => {
  return (
    <IconBase {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 96 960 960"
        width="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M160 976q-33 0-56.5-23.5T80 896V456q0-33 23.5-56.5T160 376h200V256q0-33 23.5-56.5T440 176h80q33 0 56.5 23.5T600 256v120h200q33 0 56.5 23.5T880 456v440q0 33-23.5 56.5T800 976H160Zm0-80h640V456H600q0 33-23.5 56.5T520 536h-80q-33 0-56.5-23.5T360 456H160v440Zm80-80h240v-18q0-17-9.5-31.5T444 744q-20-9-40.5-13.5T360 726q-23 0-43.5 4.5T276 744q-17 8-26.5 22.5T240 798v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420 636q0-25-17.5-42.5T360 576q-25 0-42.5 17.5T300 636q0 25 17.5 42.5T360 696Zm200-60h160v-60H560v60ZM440 456h80V256h-80v200Zm40 220Z" />
      </svg>
    </IconBase>
  );
};
