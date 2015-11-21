import { RestService } from './RestService';
import md5 from 'md5';

export class CategoriesService extends RestService {

  loadCategories() {
    return super.get('/categories');
  }
}
