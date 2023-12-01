import path from 'path';

class DrawController {
  clientHome(req, res) {
    res.sendFile((path.join(__dirname, '..', '..', '/public/index.html')));
  }

  adminPage(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '/public/admin.html'));
  }
}

export default new DrawController();
