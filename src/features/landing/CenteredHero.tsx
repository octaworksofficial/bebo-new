import DarkVeil from '@/components/DarkVeil';

export const CenteredHero = (props: {
  banner: React.ReactNode;
  title: React.ReactNode;
  description: string;
  buttons: React.ReactNode;
}) => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <DarkVeil />
    </div>

    <div className="relative z-10">
      <div className="text-center">{props.banner}</div>

      <div className="mt-3 text-center text-5xl font-bold tracking-tight text-white max-sm:text-3xl">
        {props.title}
      </div>

      <div className="mx-auto mt-5 max-w-screen-md text-center text-xl text-gray-300 max-sm:text-lg">
        {props.description}
      </div>

      <div className="mt-8 flex justify-center gap-x-5 gap-y-3 max-sm:flex-col">
        {props.buttons}
      </div>
    </div>
  </div>
);
