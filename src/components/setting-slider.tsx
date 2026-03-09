/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/i18n";

export default function SettingSlider({
  label, value, min, max, step = 1, onChange, suffix = "",
  random, onRandomChange, randomLabel,
}: {
  label: string;
  value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void;
  suffix?: string;
  random?: boolean;
  onRandomChange?: (v: boolean) => void;
  randomLabel?: string;
}) {
  const t = useI18n();
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-wf-accent">{label}</Label>
        <div className="flex items-center gap-2">
          {!random && (
            <span className="font-mono text-sm text-wf-text-secondary">{value}{suffix}</span>
          )}
          {onRandomChange && (
            <label className="flex cursor-pointer items-center gap-1 text-[10px] uppercase tracking-wider text-wf-text-dim">
              <Switch checked={random} onCheckedChange={onRandomChange} className="scale-[0.65]" />
              {t.settings.rnd}
            </label>
          )}
        </div>
      </div>
      {random ? (
        <div className="rounded-md bg-wf-bg-well py-1 text-center text-xs text-wf-text-muted">
          {t.settings.random} {randomLabel}
        </div>
      ) : (
        <Slider
          value={[value]} min={min} max={max} step={step}
          onValueChange={v => onChange(v[0])}
          className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-wf-slider-border [&_[role=slider]]:bg-wf-slider-thumb"
        />
      )}
    </div>
  );
}
