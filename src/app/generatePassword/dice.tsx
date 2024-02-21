import React from "react";

const Dice = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3006_3054)">
        <path
          d="M5.07374 3.81906L15.7932 2.87925C16.1008 2.85264 16.4106 2.88688 16.7049 2.98C16.9992 3.07313 17.2723 3.22331 17.5086 3.42199C17.7449 3.62066 17.9397 3.86393 18.082 4.13791C18.2242 4.41188 18.3111 4.71119 18.3377 5.01875L19.2844 15.8538C19.3393 16.4751 19.1452 17.0929 18.7448 17.5712C18.3443 18.0495 17.7703 18.3492 17.149 18.4044L6.42949 19.3442C6.12182 19.3709 5.81191 19.3367 5.51747 19.2436C5.22302 19.1505 4.94982 19.0002 4.71346 18.8015C4.4771 18.6027 4.28222 18.3593 4.13996 18.0852C3.9977 17.8111 3.91085 17.5117 3.88436 17.204L2.93905 6.36969C2.8841 5.74831 3.07819 5.13055 3.47863 4.65224C3.87906 4.17394 4.45238 3.87424 5.07374 3.81906ZM5.21124 5.38244C5.1086 5.39143 5.00874 5.42057 4.91737 5.46819C4.82601 5.51582 4.74493 5.58099 4.67878 5.65998C4.61262 5.73897 4.56269 5.83022 4.53184 5.92853C4.50099 6.02683 4.48983 6.13025 4.49899 6.23288L5.4443 17.0672C5.45313 17.1698 5.48208 17.2696 5.52949 17.361C5.57691 17.4523 5.64187 17.5335 5.72065 17.5998C5.79943 17.666 5.8905 17.7161 5.98865 17.7472C6.0868 17.7783 6.19011 17.7897 6.29267 17.7808L17.0115 16.8403C17.1141 16.8313 17.2139 16.8022 17.3052 16.7546C17.3965 16.707 17.4775 16.6419 17.5437 16.563C17.6098 16.4841 17.6598 16.3929 17.6907 16.2947C17.7216 16.1965 17.7328 16.0931 17.7237 15.9906L16.7777 5.15557C16.7597 4.94854 16.6602 4.75714 16.5012 4.62344C16.3421 4.48975 16.1364 4.42471 15.9294 4.44263L5.21124 5.38244ZM7.44836 9.08807C7.29622 9.10078 7.14306 9.08338 6.99765 9.03687C6.85223 8.99036 6.71741 8.91565 6.60088 8.817C6.48436 8.71836 6.38842 8.59771 6.31855 8.46197C6.24868 8.32622 6.20624 8.17803 6.19367 8.02588C6.17967 7.87375 6.19577 7.72035 6.24105 7.57444C6.28634 7.42853 6.35992 7.29298 6.4576 7.17551C6.55527 7.05804 6.67513 6.96096 6.81033 6.88982C6.94553 6.81868 7.09342 6.77486 7.24555 6.76088C7.39774 6.74817 7.55095 6.76559 7.69641 6.81214C7.84187 6.85869 7.97672 6.93347 8.09325 7.03219C8.20979 7.1309 8.30571 7.25163 8.37555 7.38745C8.44538 7.52328 8.48775 7.67154 8.50024 7.82375C8.52833 8.13088 8.4333 8.4366 8.23605 8.67368C8.0388 8.91077 7.75548 9.05982 7.44836 9.08807ZM14.368 8.481C14.2159 8.49381 14.0626 8.47649 13.9171 8.43002C13.7716 8.38355 13.6367 8.30886 13.5201 8.2102C13.4035 8.11154 13.3075 7.99087 13.2376 7.85507C13.1677 7.71928 13.1252 7.57103 13.1127 7.41882C13.0987 7.26669 13.1148 7.11329 13.1601 6.96738C13.2053 6.82147 13.2789 6.68591 13.3766 6.56844C13.4743 6.45098 13.5941 6.3539 13.7293 6.28276C13.8645 6.21161 14.0124 6.1678 14.1645 6.15382C14.3167 6.14111 14.47 6.15852 14.6154 6.20508C14.7609 6.25163 14.8957 6.32641 15.0123 6.42512C15.1288 6.52384 15.2247 6.64457 15.2945 6.78039C15.3644 6.91622 15.4068 7.06448 15.4192 7.21669C15.4332 7.36882 15.4171 7.52222 15.3719 7.66813C15.3266 7.81404 15.253 7.94959 15.1553 8.06706C15.0576 8.18453 14.9378 8.28161 14.8026 8.35275C14.6674 8.42389 14.5195 8.46771 14.3674 8.48169L14.368 8.481ZM8.05749 16.0689C7.90534 16.0817 7.75219 16.0643 7.60677 16.0177C7.46136 15.9712 7.32653 15.8965 7.21001 15.7979C7.09348 15.6992 6.99754 15.5786 6.92767 15.4428C6.8578 15.3071 6.81537 15.1589 6.8028 15.0068C6.78879 14.8546 6.80489 14.7012 6.85018 14.5553C6.89546 14.4094 6.96904 14.2739 7.06672 14.1564C7.1644 14.0389 7.28426 13.9418 7.41946 13.8707C7.55465 13.7996 7.70254 13.7557 7.85467 13.7418C8.00682 13.729 8.15997 13.7464 8.30539 13.7929C8.4508 13.8395 8.58563 13.9142 8.70215 14.0128C8.81868 14.1115 8.91462 14.2321 8.98449 14.3679C9.05436 14.5036 9.09679 14.6518 9.10936 14.8039C9.12337 14.9561 9.10727 15.1095 9.06198 15.2554C9.0167 15.4013 8.94312 15.5368 8.84544 15.6543C8.74776 15.7718 8.6279 15.8689 8.4927 15.94C8.35751 16.0111 8.20962 16.055 8.05749 16.0689ZM14.9772 15.4619C14.825 15.4746 14.6719 15.4572 14.5265 15.4107C14.381 15.3642 14.2462 15.2895 14.1297 15.1908C14.0132 15.0922 13.9172 14.9715 13.8474 14.8358C13.7775 14.7 13.7351 14.5518 13.7225 14.3997C13.7085 14.2476 13.7246 14.0942 13.7699 13.9483C13.8151 13.8023 13.8887 13.6668 13.9864 13.5493C14.0841 13.4319 14.2039 13.3348 14.3391 13.2636C14.4743 13.1925 14.6222 13.1487 14.7744 13.1347C14.9266 13.122 15.0798 13.1394 15.2252 13.186C15.3707 13.2325 15.5055 13.3073 15.6221 13.406C15.7386 13.5047 15.8345 13.6254 15.9044 13.7613C15.9742 13.8971 16.0166 14.0454 16.029 14.1976C16.0431 14.3497 16.027 14.5031 15.9817 14.649C15.9364 14.7949 15.8628 14.9305 15.7651 15.0479C15.6674 15.1654 15.5476 15.2625 15.4124 15.3336C15.2772 15.4048 15.1293 15.4479 14.9772 15.4619ZM11.2124 12.2753C11.0602 12.288 10.907 12.2706 10.7616 12.2241C10.6161 12.1775 10.4813 12.1027 10.3647 12.004C10.2482 11.9053 10.1523 11.7846 10.0824 11.6487C10.0126 11.5129 9.97022 11.3647 9.95774 11.2124C9.92965 10.9053 10.0247 10.5996 10.2219 10.3625C10.4192 10.1254 10.7025 9.97638 11.0096 9.94813C11.1618 9.93542 11.3149 9.95281 11.4603 9.99932C11.6057 10.0458 11.7406 10.1205 11.8571 10.2192C11.9736 10.3178 12.0696 10.4385 12.1394 10.5742C12.2093 10.71 12.2517 10.8582 12.2643 11.0103C12.2783 11.1624 12.2622 11.3158 12.2169 11.4618C12.1716 11.6077 12.0981 11.7432 12.0004 11.8607C11.9027 11.9782 11.7828 12.0752 11.6476 12.1464C11.5124 12.2175 11.3646 12.2613 11.2124 12.2753ZM20.0633 4.69081L20.053 4.69219C19.9705 4.70034 19.8873 4.69212 19.808 4.668C19.7287 4.64387 19.655 4.60432 19.591 4.55162C19.5271 4.49891 19.4742 4.43409 19.4353 4.36088C19.3965 4.28767 19.3725 4.20751 19.3648 4.125C19.1826 2.376 17.6302 1.10688 15.8964 1.29181H15.8915C15.8091 1.29997 15.7258 1.29178 15.6466 1.26771C15.5673 1.24363 15.4935 1.20415 15.4295 1.15153C15.3655 1.0989 15.3126 1.03417 15.2736 0.961027C15.2347 0.88789 15.2106 0.807788 15.2027 0.725314C15.1841 0.558944 15.2321 0.391976 15.3361 0.260854C15.4402 0.129731 15.5919 0.0451023 15.7582 0.025439H15.7595L15.7644 0.0247515C16.3422 -0.0365332 16.9264 0.0174713 17.4832 0.183635C18.04 0.349799 18.5583 0.624817 19.008 0.992752C19.9208 1.74029 20.5009 2.81861 20.6215 3.99232C20.6397 4.15889 20.5912 4.32588 20.4866 4.45677C20.382 4.58766 20.2298 4.67181 20.0633 4.69081ZM5.87605 22H5.87055C5.28936 22.0101 4.71194 21.9048 4.17169 21.6903C3.63145 21.4757 3.13912 21.1562 2.72317 20.7501C1.8788 19.9253 1.39448 18.8002 1.37567 17.6199C1.37161 17.4525 1.4341 17.2903 1.54945 17.1689C1.6648 17.0475 1.82358 16.9768 1.99099 16.9723H2.00199C2.3478 16.9668 2.63242 17.2473 2.63861 17.5979C2.66886 19.3573 4.10574 20.757 5.84924 20.7261H5.85336C5.9363 20.7253 6.01859 20.7408 6.09552 20.7718C6.17244 20.8028 6.24251 20.8487 6.3017 20.9068C6.36089 20.9649 6.40804 21.0341 6.44047 21.1104C6.4729 21.1868 6.48995 21.2688 6.49067 21.3517C6.49493 21.5191 6.43261 21.6814 6.31739 21.8029C6.20217 21.9244 6.04345 21.9953 5.87605 22Z"
          fill="black"
          className="fill-blue-500"
        />
      </g>
      <defs>
        <clipPath id="clip0_3006_3054">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Dice;
