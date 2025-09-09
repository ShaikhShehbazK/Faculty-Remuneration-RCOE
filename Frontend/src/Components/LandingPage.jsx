import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";
import { FaUsers, FaMoneyBillWave, FaChartLine, FaFileInvoiceDollar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { icon: <FaUsers />, color: "primary", title: "Faculty Management", text: "Manage faculty records efficiently." },
    { icon: <FaMoneyBillWave />, color: "success", title: "Payments", text: "Secure and transparent payments." },
    { icon: <FaChartLine />, color: "warning", title: "Analytics", text: "Visual reports for better insights." },
    { icon: <FaFileInvoiceDollar />, color: "info", title: "Payment Slips", text: "Instant downloadable slips." },
  ];

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Sticky Navbar */}
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold">Faculty Remuneration System</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto gap-3">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#stats">Statistics</Nav.Link>
              <Nav.Link href="#cta">Get Started</Nav.Link>
              <Button variant="primary" onClick={() => navigate("/login")}>Login</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          minHeight: "80vh",
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(13,110,253,0.7)" }} />
        <Container style={{ position: "relative", zIndex: 2 }}>
          <motion.h1 className="display-4 fw-bold mb-3" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            Faculty Remuneration System
          </motion.h1>
          <motion.p className="lead mb-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Simplifying faculty payments, payroll, and reports for colleges and universities.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Button variant="light" size="lg" className="me-3 fw-bold px-4 rounded-pill shadow-sm" onClick={() => navigate("/login")}>
              Get Started
            </Button>
            <Button variant="outline-light" size="lg" className="fw-bold px-4 rounded-pill" onClick={() => navigate("/about")}>
              Learn More
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-5 bg-light">
        <Container>
          <Row className="text-center g-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm rounded-4 py-4">
                <h2 className="fw-bold text-primary">
                  <CountUp end={250} duration={2} />+
                </h2>
                <p className="text-muted">Faculty Members</p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm rounded-4 py-4">
                <h2 className="fw-bold text-success">
                  ₹<CountUp end={1200000} duration={2} separator="," />
                </h2>
                <p className="text-muted">Payments Processed</p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm rounded-4 py-4">
                <h2 className="fw-bold text-warning">
                  <CountUp end={8} duration={2} /> Semesters
                </h2>
                <p className="text-muted">Academic Years</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5">Key Features</h2>
          <Row className="g-4">
            {features.map((f, idx) => (
              <Col md={6} lg={3} key={idx}>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.2 }}>
                  <Card className="h-100 text-center border-0 rounded-4 p-4 shadow-sm" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255,255,255,0.85)", transition: "transform 0.2s" }}>
                    <div className={`mx-auto mb-3 bg-${f.color} bg-opacity-10 text-${f.color} d-flex align-items-center justify-content-center`} style={{ width: "70px", height: "70px", borderRadius: "50%", fontSize: "1.8rem" }}>
                      {f.icon}
                    </div>
                    <h5 className="fw-bold">{f.title}</h5>
                    <p className="text-muted">{f.text}</p>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-5 text-center" style={{ backgroundColor: "#0d6efd" }}>
        <Container>
          <motion.h3 className="fw-bold text-white mb-3" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
            Ready to simplify faculty payments?
          </motion.h3>
          <motion.p className="text-white-50 mb-4" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
            Join institutions that already use our system to make remuneration easy and transparent.
          </motion.p>
          <Button variant="light" size="lg" className="fw-bold px-5 rounded-pill shadow-sm" onClick={() => navigate("/login")}>
            Get Started Today
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <Container>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <small>© {new Date().getFullYear()} Faculty Remuneration System. All Rights Reserved.</small>
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-center gap-3 small">
                <a href="/privacy" className="text-white text-decoration-none">Privacy</a>
                <a href="/terms" className="text-white text-decoration-none">Terms</a>
                <a href="/contact" className="text-white text-decoration-none">Contact</a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Custom CSS */}
      <style>{`
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
        }
        section {
          scroll-margin-top: 80px; /* Smooth scroll offset for navbar */
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
