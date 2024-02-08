"use client";

async function exitPreview() {
  const res = await fetch("/api/preview?exit=true");

  if (res.status === 200) {
    location.reload();
  } else {
    alert("Failed to exit preview mode");
  }
}

const ButtonExitPreview = () => {
  return (
    <button onClick={exitPreview} className="text-error font-bold">
      Preview mode is ON. Click here to exit
    </button>
  );
};

export default ButtonExitPreview;
