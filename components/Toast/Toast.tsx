import { toast } from "react-toastify";

import Icon from "components/Shared/Icon";

export enum ToastStatus {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}

interface Props {
  message: string;
  status: ToastStatus;
}

export const showToast = ({ message, status }: Props) => {
  switch (status) {
    case ToastStatus.SUCCESS:
      toast(<Success message={message} />);
      break;
    case ToastStatus.INFO:
      toast(<Info message={message} />);
      break;
    case ToastStatus.WARNING:
      toast(<Warning message={message} />);
      break;
  }
};

const Success = ({ message }: { message: string }) => {
  return (
    <>
      <div className="absolute w-[325px] h-[70px] bg-gradient-to-r from-lividLime to-black blur-3xl " />
      <div className="w-[325px] h-[70px] border border-lividLime/30 bg-black/70 relative z-40">
        <div className="flex items-center h-[70px] select-none">
          <div className="w-16 p-4 flex items-center justify-center">
            <Icon type="success" />
          </div>
          <div className="w-full">
            <p className="text-lividLime font-frank font-normal text-md">
              It’s a wrap!
            </p>
            <p className="text-white font-frank font-normal text-sm max-w-[325px] h-auto">
              {message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Info = ({ message }: { message: string }) => {
  return (
    <>
      <div className="absolute w-[325px] h-[70px] bg-gradient-to-r from-blueberryBlizz to-black blur-xl opacity-50" />
      <div className="w-[325px] h-[70px] border border-blueberryBlizz/30 bg-black/70 relative z-40">
        <div className="flex items-center h-[70px] select-none">
          <div className="w-16 p-4 flex items-center justify-center">
            <Icon type="info" />
          </div>
          <div className="w-full">
            <p className="text-blueberryBlizz font-frank font-normal text-md">
              Wuah! Did you know?
            </p>
            <p className="text-white font-frank font-normal text-sm max-w-[325px] h-auto">
              {message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Warning = ({ message }: { message: string }) => {
  return (
    <>
      <div className="absolute w-[325px] h-[70px] bg-gradient-to-r from-streakingStrawberries to-black blur-2xl " />
      <div className="w-[325px] h-[70px] border border-streakingStrawberries/30 bg-black/70 relative z-40">
        <div className="flex items-center h-[70px] select-none">
          <div className="w-16 p-4 flex items-center justify-center">
            <Icon type="warning" />
          </div>
          <div className="w-full">
            <p className="text-streakingStrawberries font-frank font-normal text-md">
              WTF!?
            </p>
            <p className="text-white font-frank font-normal text-sm max-w-[325px] h-auto">
              {message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
