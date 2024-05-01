import { useParams, usePathname } from "next/navigation";
import React, { createContext, useState, ReactNode, useEffect } from "react";

type CourseJSONType = JSON | null;

export interface CourseJSONContextType {
  initialCourseJSON: CourseJSONType;
  setInitialCourseJSON: React.Dispatch<React.SetStateAction<CourseJSONType>>;
  inEditCourseJSON: CourseJSONType;
  setInEditCourseJSON: React.Dispatch<React.SetStateAction<CourseJSONType>>;
}

export const CourseJSONContext = createContext<
  CourseJSONContextType | undefined
>(undefined);

interface CourseJSONProviderProps {
  children: ReactNode;
}

const exampleCourseJSON = JSON.parse(
  JSON.stringify({
    title: "Example Course",
    subtitle: "A placeholder JSON course",
    description:
      "The course description saying in a small paragraph what it will contain",
    tags: [
      "example",
      "course",
      "default",
      "learning experience",
      "json editor",
      "separate design from content",
    ],
    components: [
      {
        componentType: "container",
        children: [
          {
            componentType: "paragraph",
            title: "Starting",
            text: "This is an example json showing a bit of the format used to write courses",
          },
          {
            componentType: "paragraph",
            title: "Why this editor?",
            text: "Use this online editor since it can provide autocomplete functionality for components and properties. Also gives you a live preview window!",
          },
        ],
      },
      {
        componentType: "container",
        children: [
          {
            componentType: "paragraph",
            title: "No control over design?",
            text: "Indeed, the design is more or less controlled by the definition of components inside the source code of the application. It is our way of generalizing design over all the courses, so they maintain a consistent look.",
          },
        ],
      },
      {
        componentType: "graphic",
        graphic:
          ".KCdub2RlcyFbKCdpZCEnJCd+VmNvZGUnfmRhdGEhKCdjb2RlISgnSmF2YSEoJ2xhbmd1YWdlISdqYXZhJ35maWxlcyFbKCduYW1lISdNYWluwoVNYWluIsKISGVsbG8sIFdvcmxkJzpcJ8KLKSwoJ25hbWUhJ0FyaXRobWV0aWNFeGFtcGxlwoVBcml0aG1ldGljRXhhbXBsZSJCaW50IG51bWJlcjEgPSAxMDtCaW50IG51bWJlcjIgPSA1fHN1bT4rS1N1bVpzdW19fGRpZmZlcmVuY2U+LUtEaWZmZXJlbmNlWmRpZmZlcmVuY2V9fHByb2R1Y3Q+KktQcm9kdWN0WnByb2R1Y3R9fHF1b3RpZW50Pi9LUXVvdGllbnRacXVvdGllbnR9fHJlbWFpbmRlcj4lS1JlbWFpbmRlclpyZW1haW5kZXLCi35oaWdobGlnaHRMaW5lcyFbMyw0LDE1XSldKSMxME8tNU8nVSEnYm90dG9tTnRhcmdldCdgJzVPJ1gnMTBPJyldfnJlc2l6YWJsZSFmYWxzZSlVwoBgNTgzWDIxMFVBYnNvbHV0ZcKAQMKKNTgzWDIxMMKGwo1GJ35WcmljaC10ZXh0f2NvbnRlbnQhKCdWZG9jJ35jb250ZW50IVsoJ1ZoZWFkaW5nwo5jZW50ZXInfmxldmVsITU/bWFya3MhWygnVmJvbGQnKV1+dGV4dCEnRXhhbXBsZSBHcmFwaGljJyldSWp1c3RpZnknP3RleHQhJ1RoaXMgaXMganVzdCBhbiAnKSwoJ1Z0ZXh0J35tYXJrcyFbKCdWdW5kZXJsaW5lJyksKCdWaXRhbGljJyldfnRleHQhJ2V4YW1wbGUgZ3JhcGhpYycpLCgnVnRleHQnfnRleHQhJyBmb3Igc2hvd2Nhc2luZyBzb21lIGZlYXR1cmVzLicpXUlqdXN0aWZ5JylJcmlnaHQnP3RleHQhJy0gSG9wZSBpdCBoZWxwcyB5b3UnKV1JbGVmdCc/bWFya3MhWygnVnN0cmlrZScpXX50ZXh0ISdNYXliZScpXUljZW50ZXInKSldIzVPLU8nVSEnbGVmdE50YXJnZXQnYCdPJ1gnNU8nwo1PLTVPJ1UhJ3RvcE5zb3VyY2UnYCc1TydYJ08nwo1PLV4nVSEndG9wTnNvdXJjZSdgJ14nWCdPJyldKVXCgX5zdHlsZSEoJ2hlaWdodCEyMDBgMzAwKWAzMDBYMjAwfnNlbGVjdGVkIXRydWV+ZHJhZ2dpbmchZmFsc2VVQWJzb2x1dGXCgcKNJid+VmluZm9ybWF0aW9uf2luZm9DZmchKCdjb250ZW50ISdUaGlzIGlzIGFuIGV4YW1wbGUgaW5mb3JtYXRpb24gbm9kZS4gWW91IGNhbiByZXNpemUgaXQgYW5kwolpY29uIHdpbGwgZ2V0IGJpZ2dlci4gVGhlIGVkaXRpbmcgYnV0dG9uIHRoYXQgYXBwZWFycyBpbsKJY29ybmVyIGlzIHZpc2libGUgb25seSBpbiB0aGlzIGVkaXRvci4gWW91IGNhbiBjaGFuZ2XCiWNvbnRlbnQgYW5kwolmb250IHNpemUuIFdoZW7CiWluZm9ybWF0aW9uIGdldHMgdG9vIGxvbmcswoljb250ZW50IHdpbGwgYmVjb21lIHNjcm9sbGFibGUuIFRoZSBtYXhpbXVtIGhlaWdodCBvZiB0aGlzIGJveCBpcyAxMjhweCwgYW5kwoltYXhpbXVtIHdpZHRoIGlzIDI1NnB4Lid+Zm9udFNpemUhMTJ+c2lkZSEndG9wJyM1Ty0xME8nVSEncmlnaHROc291cmNlJ2AnMTBPJ1gnNU8nKV0pVcKCYDYxWDYxwoo2MVg2McKGVUFic29sdXRlwoJAwo08J35WaW1hZ2V/aW1nRGF0YSEoJ3NyYyEnaHR0cHM6Ly9jZG4udmVjdG9yc3RvY2suY29tL2kvMTAwMHgxMDAwLzAzLzkzL2hlbGxvLXdvcmxkLXZlY3Rvci0xNjc4MDM5My53ZWJwJ35rZWVwQXNwZWN0UmF0aW8hZmFsc2UjNU8tTydVISdsZWZ0TnRhcmdldCdgJ08nWCc1TycpXSlVwoNgMjMyWDE4OEBVQWJzb2x1dGXCg8KKMjMyWDE4OMKGKV1+ZWRnZXMhWygnc291cmNlIScmwoc1Ty0xME8nfnRhcmdldCEnRsKEJjVPLTEwTy1GNU8tTyd+YW5pbWF0ZWQhdHJ1ZSksKCdzb3VyY2UhJ0bCh08tNU8nfnRhcmdldCEnJCd+dGFyZ2V0SGFuZGxlIScxME8tNcKMRk8tNU8tJDEwTy01Tyd+VnNtb290aHN0ZXAnfm1hcmtlckVuZCEoJ1ZhcnJvd2Nsb3NlZCdgMjBYMjApKSwoJ3NvdXJjZSEnRsKHTy1eJ350YXJnZXQhJzzChEZPLV4tPDVPLU8nflZzbW9vdGhzdGVwJyldfnZpZXdwb3J0ISgneCEtMTg2LjUzMjQ5ODAxODg5MTAzfnkhLTI0NS4zMTIzNTAwNjc1NjY4NX56b29tITAuODk0NDMzMDAzMzI5MDk1MSkpQlxuICAgICAgRmNmOTM2Y2NlLWFhYmEtNGRkMy05MTAxLTMxZDUxOTI5YTQzM0kpLCgnVnBhcmFncmFwaMKOSyBudW1iZXIyO8KITid+aXNDb25uZWN0YWJsZSF0cnVlflZPMCVVfnBvc2l0aW9uVnR5cGUhJ1h+aGVpZ2h0IVo6IFwnICsgIiAoXG4gIHB1YmxpYyBzdGF0aWMgdm9pZCBtYWlue1N0cmluZ1tdIGFyZ3N9ICgjKX5jdXN0b21IYW5kbGVzIVsoJ2lkISckNDIzNjE5MDQtMTg2MC00MWE4LTljMWEtYzM4NDVkYWM3YjA2JjNlNjRkY2MyLWEwM2YtNGRhMC04NTg1LWNkMDgzYzg0YTZjMTw3YmRmMzBiMy1jMWVlLTRjNzgtYTYwOC02NTRmZjAzOTM1Njg+ID0gbnVtYmVyMSA/KX5jb250ZW50IVsoJ1Z0ZXh0J35AfnNlbGVjdGVkIWZhbHNlfmRyYWdnaW5nIWZhbHNlXjU5Ljg2MDA3MjkxMTAyNTUyJWB+d2lkdGghfDtcbkJpbnQgfyd+ZGF0YSEoJ3Jlc2l6YWJsZSFmYWxzZX7CgCEoJ3ghMzQ5LjgwNzEyMDU4NTg5NzJ+eSEzMzUuMjM0MTk4ODMyOTY3NjUpwoEhKCd4ITU3My4xOTI3NjQyNjE1NjQ5fnkhODI5LjQ1NjgzNTE0MjY4NzcpwoIhKCd4ITI1OC41MDM3ODQzNDE3Mjg4fnkhODMxLjY4MTI0MzkwNzY5NzYpwoMhKCd4ITEwMjUuNjEzMTE5ODc2MzQ1fnkhNTIxLjI5NjM4NzY5MDk4MynChCd+dGFyZ2V0SGFuZGxlISc1Ty3CjMKFLmphdmEnfmNvZGUhJ3B1YmxpYyBjbGFzcyDChil+cmVzaXppbmchZmFsc2XChyd+c291cmNlSGFuZGxlISfCiEJTeXN0ZW0ub3V0LnByaW50bG57XCfCiSB0aGUgwop+c3R5bGUhKCd3aWR0aCHCi307XG4gIClcbiknwoxPJ35pZCEncmVhY3RmbG93X19lZGdlLcKNKSwoJ2lkISfCjid+YXR0cnMhKCd0ZXh0QWxpZ24hJwHCjsKNwozCi8KKwonCiMKHwobChcKEwoPCgsKBwoB/fGBeQD8+PCYkIyJaWFZVT05LSUZCXw==",
      },
    ],
  })
) as JSON;

const CourseJSONProvider = ({ children }: CourseJSONProviderProps) => {
  const [initialCourseJSON, setInitialCourseJSON] =
    useState<CourseJSONType>(null);
  const [inEditCourseJSON, setInEditCourseJSON] =
    useState<CourseJSONType>(null);

  const path = usePathname();
  const params = useParams();

  useEffect(() => {
    if (!path.startsWith("/courses/editor")) {
      setInitialCourseJSON(null);
      setInEditCourseJSON(null);
      return;
    }

    if (params.courseArgs) {
      return;
    }

    setInitialCourseJSON(exampleCourseJSON);
    setInEditCourseJSON(exampleCourseJSON);

    // ignoring initialCourseJSON
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, params, setInEditCourseJSON, setInitialCourseJSON]);

  return (
    <CourseJSONContext.Provider
      value={{
        initialCourseJSON,
        setInitialCourseJSON,
        inEditCourseJSON,
        setInEditCourseJSON,
      }}
    >
      {children}
    </CourseJSONContext.Provider>
  );
};

export default CourseJSONProvider;
