import { RestService } from './RestService';

export class CategoriesService extends RestService {

  loadCategories() {
    return super.get('/categories');
  }
}
