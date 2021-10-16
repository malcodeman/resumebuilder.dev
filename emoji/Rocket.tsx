type props = {
  size?: number;
};

function Rocket(props: props) {
  const { size = 24, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      {...rest}
    >
      <path
        fill="#A0041E"
        d="M1 17l8-7 16 1 1 16-7 8s.001-5.999-6-12-12-6-12-6z"
      />
      <path
        fill="#FFAC33"
        d="M.973 35s-.036-7.979 2.985-11S15 21.187 15 21.187 14.999 29 11.999 32c-3 3-11.026 3-11.026 3z"
      />
      <circle fill="#FFCC4D" cx={8.999} cy={27} r={4} />
      <path
        fill="#55ACEE"
        d="M35.999 0s-10 0-22 10c-6 5-6 14-4 16s11 2 16-4c10-12 10-22 10-22z"
      />
      <path d="M26.999 5a3.996 3.996 0 00-3.641 2.36A3.969 3.969 0 0124.999 7a4 4 0 014 4c0 .586-.133 1.139-.359 1.64A3.993 3.993 0 0030.999 9a4 4 0 00-4-4z" />
      <path
        fill="#A0041E"
        d="M8 28s0-4 1-5 13.001-10.999 14-10-9.001 13-10.001 14S8 28 8 28z"
      />
    </svg>
  );
}

export default Rocket;
