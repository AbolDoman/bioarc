import { Button, Image, VStack } from "@chakra-ui/react";
import { Mic } from "lucide-react";
import { useState, memo, useCallback, useMemo } from "react";
import arrowDown from "app/assets/arrowDown.svg";
import { useTranslation } from "react-i18next";

// Input field component with dynamic positioning based on language direction
const InputWithIcon = memo(
  ({
    value,
    onChange,
    icon,
    placeholder,
    id,
    isRtl,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    placeholder?: string;
    id: string;
    isRtl: boolean;
  }) => (
    <div className="relative border-2 border-gray-300 focus-within:border-gray-400 rounded-lg">
      <input
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        className="w-full p-3 text-gray-700 bg-white border-none outline-none appearance-none rounded-lg"
      />
      <div
        className={`absolute inset-y-0 ${isRtl ? "left-3" : "right-3"} flex items-center pointer-events-none`}
      >
        {icon}
      </div>
    </div>
  )
);
InputWithIcon.displayName = "InputWithIcon";

// Select component with custom styling
const SelectWithIcon = memo(
  ({
    value,
    onChange,
    options,
    id,
    isRtl,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    id: string;
    isRtl: boolean;
  }) => (
    <div className="relative border-2 border-gray-300 focus-within:border-gray-400 rounded-lg">
      <select
        value={value}
        onChange={onChange}
        id={id}
        className="w-full p-3 text-gray-700 bg-white border-none outline-none appearance-none rounded-lg"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div
        className={`absolute inset-y-0 ${isRtl ? "left-3" : "right-3"} flex items-center pointer-events-none`}
      >
        <Image height={"20px"} width={"20px"} src={arrowDown} alt="Select" />
      </div>
    </div>
  )
);
SelectWithIcon.displayName = "SelectWithIcon";

// Form field with label
const FormField = memo(
  ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="w-full flex flex-col space-y-2">
      <label className="text-gray-600 text-sm font-semibold">{label}</label>
      {children}
    </div>
  )
);
FormField.displayName = "FormField";

// Reason note input component
const ReasonNote = memo(
  ({
    reasonNote,
    setReasonNote,
  }: {
    reasonNote: string;
    setReasonNote: (value: string) => void;
  }) => {
    const { t, i18n } = useTranslation();

    // Handle input changes efficiently
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setReasonNote(e.target.value);
      },
      [setReasonNote]
    );

    // Determine text direction based on language
    const isRtl = i18n.language !== "en";

    return (
      <FormField label={t("noteText")}>
        <InputWithIcon
          id="reason-note"
          value={reasonNote}
          onChange={handleChange}
          icon={<Mic size={"16px"} />}
          isRtl={isRtl}
        />
      </FormField>
    );
  }
);
ReasonNote.displayName = "ReasonNote";

// Appointment reason select component
const AppointmentReasonSelectBox = memo(
  ({
    reasonValue,
    setReasonValue,
  }: {
    reasonValue: string;
    setReasonValue: (value: string) => void;
  }) => {
    const { t, i18n } = useTranslation();

    // Handle select changes efficiently
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReasonValue(e.target.value);
      },
      [setReasonValue]
    );

    // Prepare options with translations - will only recompute when language changes
    const options = useMemo(
      () => [
        { value: "", label: t("selectPlaceholder") },
        { value: "support", label: t("hospitalization") },
        { value: "sales", label: t("treatment") },
        { value: "other", label: t("other") },
      ],
      [t]
    );

    // Determine text direction based on language
    const isRtl = i18n.language !== "en";

    return (
      <FormField label={t("contactReason")}>
        <SelectWithIcon
          id="reason-select"
          value={reasonValue}
          onChange={handleChange}
          options={options}
          isRtl={isRtl}
        />
      </FormField>
    );
  }
);
AppointmentReasonSelectBox.displayName = "AppointmentReasonSelectBox";

// Main appointment detail component
const AppointmentDetail = memo(({ isMobile }: { isMobile: boolean }) => {
  const [reasonValue, setReasonValue] = useState("");
  const [reasonNote, setReasonNote] = useState("");
  const { t } = useTranslation();

  // Determine if form is valid
  const isFormValid = Boolean(reasonValue && reasonNote);

  // Button styles based on form validity
  const submitButtonStyle = useMemo(
    () => ({
      bgColor: isFormValid ? "#DEF5FE" : "#EEF0FA",
      fontSize: isMobile ? "12px" : "14px",
    }),
    [isFormValid, isMobile]
  );

  return (
    <VStack
      borderRadius={"12px"}
      overflow={"hidden"}
      bgColor={"white"}
      boxShadow={"0 10px 30px #CFDDF080"}
      p={"16px"}
      width={"100%"}
      spacing={"8px"}
    >
      <Button
        bgColor={"#DEF5FE"}
        transition={"all 100ms"}
        _active={{ bgColor: "aqua" }}
        borderRadius={"6px"}
        color={"#2F3E63"}
        fontWeight={"600"}
        p={"8px 16px"}
        _hover={{ opacity: "80%" }}
        alignSelf={"end"}
        fontSize={isMobile ? "12px" : "14px"}
      >
        {t("AppointmentForOther")}
      </Button>

      <AppointmentReasonSelectBox
        reasonValue={reasonValue}
        setReasonValue={setReasonValue}
      />

      <ReasonNote reasonNote={reasonNote} setReasonNote={setReasonNote} />

      <Button
        bgColor={submitButtonStyle.bgColor}
        transition={"all 100ms"}
        disabled={!isFormValid}
        borderRadius={"6px"}
        alignSelf={"end"}
        mt={"8px"}
        color={"#2F3E63"}
        fontWeight={"600"}
        fontSize={submitButtonStyle.fontSize}
        p={"8px 16px"}
        _hover={{ opacity: "80%" }}
      >
        {t("SaveInformation")}
      </Button>
    </VStack>
  );
});

AppointmentDetail.displayName = "AppointmentDetail";

export default AppointmentDetail;
