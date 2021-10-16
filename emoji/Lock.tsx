type props = {
  size?: number;
};

function Lock(props: props) {
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
        fill="#AAB8C2"
        d="M18 3C12.477 3 8 7.477 8 13v10h4V13a6 6 0 0112 0v10h4V13c0-5.523-4.477-10-10-10z"
      />
      <path
        fill="#FFAC33"
        d="M31 32a4 4 0 01-4 4H9a4 4 0 01-4-4V20a4 4 0 014-4h18a4 4 0 014 4v12z"
      />
    </svg>
  );
}

export default Lock;
