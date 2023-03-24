import IconBase, { IconBaseProps } from './IconBase';

export const LockOutlined: React.FC<IconBaseProps> = (props) => {
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
        <path d="M240 976q-33 0-56.5-23.5T160 896V496q0-33 23.5-56.5T240 416h40v-80q0-83 58.5-141.5T480 136q83 0 141.5 58.5T680 336v80h40q33 0 56.5 23.5T800 496v400q0 33-23.5 56.5T720 976H240Zm0-80h480V496H240v400Zm240-120q33 0 56.5-23.5T560 696q0-33-23.5-56.5T480 616q-33 0-56.5 23.5T400 696q0 33 23.5 56.5T480 776ZM360 416h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240 896V496v400Z" />
      </svg>
    </IconBase>
  );
};
