import ButtonHeader from "./ButtonHeader";

export default function WebHeader() {
  return (
    <>
      <div className="flex bg-gray-800 shadow-lg shadow-xl shadow-gray-700/50">
        <h1 className="text-2xl p-6 bg-gray-800 text-white text-shadow-lg/30 grow">
          Tugas Cipher
        </h1>
        <div className="gap-3 flex grid-cols-4">
          <ButtonHeader name="home" link="/home" />
          <ButtonHeader name="Caesar" link="/caesar" />
          <ButtonHeader name="Atbash" link="/atbash" />
          <ButtonHeader name="Transposition" link="/transposition" />
          <ButtonHeader name="History" link="/History" />
        </div>
      </div>
    </>
  );
}
