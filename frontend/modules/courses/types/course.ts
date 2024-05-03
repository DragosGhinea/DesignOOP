export type Course = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  components: any[];
  textSearchScore?: number;
};

export type CoursesPage = {
  content: Course[];
  pageNumber: number;
  totalPages: number;
  pageSize: number;
};
